import { AppView } from 'components';
import { loginAPI } from 'features/login/loginApi';
import * as React from 'react';
import { handleException } from 'utils';
import { groupBy, find, orderBy } from 'lodash';
import { StyleSheet } from 'react-native';
import { CacheCommon, CommonItem, RsIdItem, IndustryResponse } from 'app/type';
import { BlocksRecord } from 'app/type';
import { getValue } from 'utils';

export interface ICommonContext {
  getBlocks: () => Promise<void>;
  getCommon: () => Promise<void>;
  getIndustry: () => Promise<void>;
  listCommonByCode: (key: string) => Array<CommonItem>;
  getRsId: () => Promise<void>;
  rsIdByName: (key: string) => RsIdItem;
  listIndustry: () => IndustryResponse;
  listBlocks: () => Array<BlocksRecord>;
}

const AppCommonContext = React.createContext<ICommonContext>({} as ICommonContext);

const AppCommonProvider: React.FC = props => {
  const [common, setCommon] = React.useState<CacheCommon>();
  const [rsId, setRsId] = React.useState<Array<RsIdItem>>();
  const [industry, setIndustry] = React.useState<IndustryResponse>();
  const [lstBlock, setLstBlock] = React.useState<Array<BlocksRecord>>([]);

  const fetchCommon = async () => {
    try {
      const commonList = await loginAPI.getCommon(2147483647);
      setCommon(groupBy(commonList.content, 'commonCategoryCode'));
    } catch (error) {
      handleException(error);
    }
  };

  const fetchIndustry = async () => {
    try {
      const listIndustry = await loginAPI.getIndustry();
      setIndustry(listIndustry);
    } catch (err) {
      handleException(err);
    }
  };

  const fetchRsId = async () => {
    try {
      const listRsId = await loginAPI.userPermission();
      setRsId(listRsId);
    } catch (error) {
      handleException(error);
    }
  };

  const fetchBlocks = async () => {
    try {
      const response = await loginAPI.getBlocks();
      const content = orderBy(
        getValue(response, 'content', []),
        function (o: BlocksRecord) {
          return o.code;
        },
        ['desc'],
      );
      setLstBlock(content);
    } catch (err) {
      handleException(err);
    }
  };

  const commonContext = React.useMemo<ICommonContext>(() => {
    return {
      getRsId: fetchRsId,
      listRsId: rsId,
      rsIdByName: (key: string) => {
        return find(rsId, o => o.rsname === key);
      },
      getCommon: fetchCommon,
      getIndustry: fetchIndustry,
      getBlocks: fetchBlocks,
      listCommonByCode: (key: string) => {
        return common ? common[key] : [];
      },
      listIndustry: () => industry,
      listBlocks: () => lstBlock,
    };
  }, [common]);

  return (
    <AppView style={styles.container}>
      <AppCommonContext.Provider value={commonContext} {...props} />
    </AppView>
  );
};

const useCommon = (): ICommonContext => {
  const context = React.useContext<ICommonContext>(AppCommonContext);
  return context;
};

export { AppCommonProvider, AppCommonContext, useCommon };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

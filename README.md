# Cấu trúc navigation của APP:

App sử dụng thư viện React Navigation để thực hiện điều hướng trong React Native. Cấu trúc của navigation sẽ như sau:

- RootStack 
    - Splash Screen
    - Authen Group
        - LoginScreen
        - HelpScreen
    - App Group 
        - AppTab (Kiểu tab) 
            - DashBoardScreen
            - CustomerScreen
            - Những screen khác được đưa lên tab
    - Utils Group
        - Biểu phí
        - Lãi suất
        - Những giao diện khác thuộc công cụ

Đối với những chức năng mới. Không tạo nhiều kiểu navigation lồng trong RootStack trong navigation mà tạo thành 1 group mới trong RootStack Navigation

# Thiết kế tổng quát:

## 1. Kiến trúc:
App sử dụng kiến trúc FLUX thông qua áp dụng thư viện redux. Sử dụng công cụ Redux toolkit. Sử dụng Type Script

### Các lưu ý khi sử dụng thư viện redux:
####  Cốt yếu
- Không được trực tiếp thay đổi state trong reducer. Điều này sẽ gây ra lỗi về rerender giao diện trong ứng dụng. Cách khắc phục là sử dụng thư viện Immer hoặc tạo ra 1 copy của reducer.
- Reducer được phụ thuộc vào 2 tham số đầu vào là state của nó và actions và chỉ tính toán trên 2 tham số đó và trả ra 1 state mới (Chứ không thay đổi state cũ vì vi phạm nguyên tắc trên). Nó sẽ không thực hiện các logic background hoặc tính toán tạo ra các random value. Mục đích để đảm bảo reducer luôn luôn ổn định và tính toán được.
-  Chỉ có 1 reducer 1 App
#### Đặc biệt khuyên dùng 
- Sử dụng Redux Toolkit để viết redux logic
- Cấu trúc project theo thư mục chức năng và chỉ có 1 file logic, cụ thể là file "featureSlice.tsx". Mục đích dễ maintain
- Đưa nhiều logic nhất vào file reducer có thể. Vì khi đưa nhiều logic tính toán vào reducer sẽ có cái nhìn tổng quan và dễ viết unit test, dễ maintain.
- Tổ chức reducer dưới dạng đối tượng dữ liệu, chứ không theo screen. Ví dụ: {user, campaign, salekit} chứ không theo screen kiểu {loginscreen, campaignScreen}
- Xử lý reducer thực hiện tuần tự theo từng bước tuần tự ví dụ (idle, processing, succes, failure).
- Biến đổi object trong redux những object phúc tạp , object lồng nhau, object có quan hệ với nhau thành những object đơn giản, phẳng. mối liên kết với nhau thể hiện qua ID 
<details><summary>ví dụ: </summary>

Tham khảo thêm. https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
</details>

- Giữ cho state trong reducer nhỏ nhất và đơn giản nhất có thể, những dữ liệu khác suy ra từ dữ liệu cơ bản có thể sử dụng hàm để tính toán và sử dụng cách ghi nhớ hàm để trả về ( sử dụng thư viện reselector). Ví dụ cho trường hợp này là chức năng tìm kiếm, filter tìm kiếm. Đối với chức năng này, Cách cũ chúng ta sẽ = lưu dữ liệu tìm kiếm được sau khi kết thúc hàm tìm kiếm thành 1 mảng rồi mới hiển thị. Cách mới theo khuyên dùng là sẽ reselector hàm tìm kiếm với dữ liệu lấy được từ API và các từ khoá tìm kiếm.
- Viết tên action dưới dạng sự kiện xảy ra, không viết chung chung kiểu getState trong Reducer. Viết dưới dạng: feature/eventName. Viết  
{ type: "food/orderAdded",  payload: {pizza: 1, coke: 1} } 
thay vì {"type":"orders/setPizzas
Ordered","payload":{"amount":" getState().orders.pizza + 1"}}
- Viết tên action có nghĩa. Mục đích là để debug cho dễ. Sử dụng công cụ redux dev Tool để debug redux.
- Tránh dispatch vào reducer quá nhiều lần. Nếu muốn dispatch nhiều lần sử dụng hàm batch() trong react_redux
- Sử dụng các API hook của React_redux như “useSelector”, “useDispatch” thay vì dùng “connect” như trước đây”
- Chia nhỏ component để kết nối với reducer tốt cho việc render hơn là sử dụng 1 component to để kết nối với Reducer. Rõ ràng việc chia nhỏ component thì sẽ giúp giảm việc render khi thay đổi state trong reducer hơn 1 component to gồm lấy nhiều thông tin từ reducer
- Sử dụng useSelector nhiều lần để lấy dữ liệu nhỏ tốt hơn là sử dụng useSelector để lấy cả cục dữ liệu lớn rồi lên giao diện mới xử lý
- Chỉ sử dụng kiểu dữ liệu mặc định của javascript cho Reducer Không sử dụng các kiểu dữ liệu do thư viện thứ 3 cung cấp

#### Khuyên dùng
- Viết Action Theo API create action trong redux toolkit sử dụng chuẩn “Flux Standard Action” (FSA).
Theo chuẩn FSA 1 action được quy định như sau
~~~
{
    Type, //Tên action
    Payload, //Data trả về từ action. Nếu error = true thì data này là kiểu lỗi
    Error, //Xác định nó là lỗi hay không
    Meta, // Những thông tin thêm của action
}
~~~
Tham khảo https://github.com/redux-utilities/flux-standard-action
- Sử dụng redux thunk. Nếu dùng Redux Toolkit thì mặc định là redux thunk rồi. Nếu muốn có những tác vụ khó hơn như cancel, debounce, chạy logic khác khi action được dispatch, thread chạy ngầm thì dùng redux saga hoặc redux observer
- Viết logic trong file slice không viết trong Component. Component chỉ đùng để hiển thị.
- Sử dụng selector function để lấy thông tin từ Redux store (Thư viện reselect). Mục đích làm tăng hiệu năng.
- Viết tiền tố selectSomething nếu sử dụng để lấy dữ liệu từ redux store
- Tránh nhét các dữ liệu không cần thiết vào redux store như các dữ liệu chỉ ở form đó. Ví dụ dữ liệu của text field, button. Thay vào đó sau khi kết thúc form đó thì dispatch vào redux store 1 thể.

## 2. Data base:
Sử dụng thư viện WaterMelon base trên SQLite

## 3. Kết nối API
Sử dụng RESTFull thông qua thư viện apisauce (Axios)

## 4. Cấu trúc thư mục
Thư mục được cấu trúc dạng folder như sau:
- api: Chứa các file liên quan đến kết nối API
- app: Chứa các file liên quan đến base (Context, hooks, rootReducer, store, type...)
- assets: Chứa các icon và
    - fonts: Chứa các font chữ ứng dụng sử dụng.
    - icons: Chứa các icon ứng dụng sử dụng.
    - colors.js:
    - themes.js: Chứa themes của ứng dụng.
- components: Chứa các component dùng chung cho toàn ứng dụng (chỉ cần truyền props vào là chạy)
    - Chứa App Base Component. Tất cả các Component sử dụng trong Project đều phải dùng qua App BaseComponent này Tuyệt đối không dùng component ngoài 
    - Chứa các components tạo bởi App Base Component nhưng có thể tái sử dụng lại. Phạm vi toàn APP.
- constants: Chứa các hằng số và config cần thiết cho project.
    - const: chứa hằng số
    - config: chứa những cấu hình cần thiết để project chạy được: Ví dụ Base URL, thời gian TIMEOUT_SCREEN, v.v
- context: Common context
- features: Các chức năng sẽ được đặt hết vào trong thư mục này.
    - feature: thư mục chứa một chức năng. trong thư mục này có thể có nhiều màn hình, trong mỗi màn hình có thể có nhiều component con.
        - components: Chứa các components chỉ sử dụng cho màn hình này. Bắt buộc phải base từ components ngoài thư mục gốc
        - featureSlice.tsx: File chứa logic xử lý, reducer, action của giao diện.
        - feature.tsx: File giao diện.
        - featureApi.tsx: File chứa các API của giao diện
        - style.js: File style của giao diện
- localization: Dùng để chứa file String đa ngôn ngữ
- navigations: Chứa các navigation điều hướng ứng dụng. Navigations theo đúng cấu trúc ở trên.
- utils: Chứa các hàm dùng chung ví dụ như datetime, AsyncStorage, Helper database
- DataBase: Chứa các file khai báo liên quan đến database.

# Conventions

1. Project cấu trúc theo hướng feature, tùy theo chức năng để phân chia folder, tất cả các screen khi muốn thêm mới đều coppy từ folder "base-folder"
2. Tách các component ra các element nhỏ nhất để tăng tính resuse và dễ dàng cho người đọc và maintain sau này, khi tách ra đảm bảo tính độc lập nghĩa là chuyển sang chỗ khác chỉ cần truyền props vào là work.
3. Các base element đều phải implement từ folder "component" để dùng, ví dụ "Button,Text, Image ...."
- Các Element dựa trên Element của React Native Paper.
- Chỉ sử dụng các Base Element đã có trong "Component" để tạo giao diện. Không import giao diện trực tiếp từ thư viện ngoài. Nếu chưa có BaseElement trong folder component thì tạo mới. Muốn sử dụng Thư viện ngoài giao diện ngoài thì phải bọc lại và đưa vào Base Element
- Quy tắc đặt tên trong BaseElement là: Thêm tiền tố "App" Đứng trước. Sau đó phải khai báo vào file index trong thư mục component
4. Không được import dạng ..../....// , tất cả phải import asoblute path
5. Sử dụng function component
6. Các hàm xử lý liên quan đến datetime, asynstore, realm, đều phải viết trong folder util, tất cả các thư viện xử lý bên ngoài như lodash, moment, dayjs Phải xử lý trong folder utils, không import trực tiếp vào trong project
7. Định nghĩa các hằng số:
- Các biến hệ thông, Base URL, các biến có thể thay đổi theo môi trường build (UAT, LIVE, APIGEE) thì phải khai báo vào file .env và file constants\config
- Các biến hằng số sử dụng trong chức năng khai báo vào file constants\const
- Các Method của API khai báo trong file constants\api
8. color, themse, font được khai báo trong folder asset
- Khi thêm font mới, khai báo trong file Themes.tsx. Khai báo như mẫu DefaultThemes hoặc DarkTheme. 
- Khi khai báo thêm thuộc tính trong 1 theme. Phải khai báo thuộc tính đó trong các theme còn lại.
9. Kết nối API phải được viết trong file featureApi.tsx: File chứa các API của giao diện. Trong file này tạo ra 1 instance riêng. Khi kết thúc giao diện sẽ cancel instance này
10. no style in line, no bind function, use arrow function
11. Đặt tên biến + folder + class + function có chất xám :v
12. Mong mọi người đoàn kết làm việc chửi nhau thì được nhưng đừng có lì =))
13. dùng Yarn nhé
14. Tên folder đặt tên dạng viết thường phân cách nhau bởi dấu "-" ví dụ, login,
    login-default, login-with-account,
15. Tất cả string để phải lấy từ file vi.json, đặt tên biến dạng : logout-default, logout-with-account
16. Chỉ gọi Hook ở tầng trên cùng, không gọi trong vòng lặp, trong câu lệnh điều kiện, trong các function lồng nhau.
17. Chỉ gọi Hook trong các function components. Không gọi hook trong Function React..
18. Dữ liệu lưu trữ Async storage local bắt buộc phải được mã hoã
19. Đối với các hàm nặng thì sử dụng useMemo và useCallback để tăng performance.
20. Định nghĩa các type, interface trong project thì sẽ đặt ở file type.tsx trong thư mục app
- Nếu là các base element trong "component" khai báo type vào trong file luôn. Vì base element sẽ không phụ thuộc vào project

# Lưu ý
## DEV
### Định nghĩa hoàn thành công việc của dev trước khi bàn giao cho test
- Hoàn thành chức năng theo đúng code convention ở trên.
- Không còn lỗi lint trong chức năng. (check lỗi lint bằng cách chạy lệnh yarn lint, fix 1 số lỗi bằng cách chạy yarn lint:fix)
- Chạy luồng chính không có lỗi, không lỗi crash
- Phải có sơ đồ luồng xử lý (Sử dụng công cụ draw io để vẽ)


## Golive
### 1. Tăng version 
- package.json
  >"version": "1.0.6",
  >"versionCode": 4,
- android/app/build.gradle
  >versionCode 7
  >versionName "1.0.6"

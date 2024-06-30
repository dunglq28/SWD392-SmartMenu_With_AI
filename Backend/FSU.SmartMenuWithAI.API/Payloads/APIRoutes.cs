namespace FSU.SmartMenuWithAI.API.Payloads
{
    public static class APIRoutes
    {
        public const string Base = "api";

        public static class SmartMenu
        {
            public const string GetAll = Base + "/weatherforecast/";
        }

        public static class Authentication
        {
            public const string Login = Base + "/authentication/login";
            public const string LoginMobile = Base + "/authentication/login-mobile";

            public const string RefreshToken = Base + "/authentication/refresh-token";

        }
        public static class Account
        {
            public const string ChangePassword = Base + "/account/change-password";

            public const string BanAccount = Base + "/account/ban-account";
        }
        public static class AppUser
        {
            public const string GetAll = Base + "/app-users/";

            public const string GetByID = Base + "/app-users/get-by-id";

            public const string Update = Base + "/app-users/";

            public const string Delete = Base + "/app-users/";

            public const string Add = Base + "/app-users/";
        }
        public static class Attribute
        {
            public const string GetAll = Base + "/attributes/";

            public const string GetByID = Base + "/attributes/get-by-id";

            public const string Update = Base + "/attributes/";

            public const string Delete = Base + "/attributes/";

            public const string Add = Base + "/attributes/";
        }

        public static class Brand
        {
            public const string GetAll = Base + "/brands/";

            public const string GetAllName = Base + "/brands/get-all-name";

            public const string GetByID = Base + "/brands/get-by-id";

            public const string Add = Base + "/brands/add";

            public const string Update = Base + "/brands/update";

            public const string Delete = Base + "/brands/delete";

            public const string GetByUserID = Base + "/brands/get-by-userid";
        }

        public static class Store
        {
            public const string GetAll = Base + "/stores/";

            public const string GetByID = Base + "/stores/get-by-id";

            public const string Update = Base + "/stores/";

            public const string Delete = Base + "/stores/";

            public const string Add = Base + "/stores/";
        }

        public static class Category
        {
            public const string GetAll = Base + "/categories/";

            public const string GetByID = Base + "/categories/get-by-id";

            public const string GetByBrandID = Base + "/categories/get-by-brand-id";

            public const string Update = Base + "/categories/";

            public const string Delete = Base + "/categories/";

            public const string Add = Base + "/categories/";
        }

        public static class Menu
        {
            public const string GetAll = Base + "/menus/";

            public const string GetByID = Base + "/menus/get-by-id";

            public const string Update = Base + "/menus/";

            public const string Delete = Base + "/menus/";

            public const string Add = Base + "/menus/";
        }
        public static class GroupAttribute
        {
            public const string GetAll = Base + "/group-attributes/";
            public const string GetByID = Base + "/group-attributes/get-by-id";

            public const string Add = Base + "/group-attributes/add";

            public const string Update = Base + "/group-attributes/update";

            public const string Delete = Base + "/group-attributes/delete";
        }
        public static class Product
        {
            public const string GetAll = Base + "/products/";

            public const string Add = Base + "/products/";

            public const string Update = Base + "/products/";

            public const string Delete = Base + "/products/";

            public const string GetByID = Base + "/products/get-by-id";
            public const string testRecogize = Base + "/products/test-recogize";
        }
        public static class ProductMenu
        {
            public const string GetAll = Base + "/products-menu/";

            public const string GetByID = Base + "/products-menu/get-by-id";

            public const string GetProductNotInMenu = Base + "/products-menu/get-product-not-in-menu";

            public const string Update = Base + "/products-menu/";

            public const string Delete = Base + "/products-menu/";

            public const string Add = Base + "/products-menu/";
        }
        public static class ListPosition
        {
            public const string GetByID = Base + "/list-positions/get-by-id";

            public const string GetByBrandID = Base + "/list-positions/get-by-brand-id";

            public const string Add = Base + "/list-positions/";

            public const string Update = Base + "/list-positions/";

            public const string Delete = Base + "/list-positions/";

        }

    }
}

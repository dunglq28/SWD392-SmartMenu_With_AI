namespace SmartMenu.Payloads
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

            public const string RefreshToken = Base + "/authentication/refreshtoken";
        }

        public static class AppUser
        {
            public const string GetAll = Base + "/appusers/";

            public const string GetByID = Base + "/appusers/get-by-id";

            public const string Update = Base + "/appusers/";

            public const string Delete = Base + "/appusers/";

            public const string Add = Base + "/appusers/";
        }

        public static class Brand
        {
            public const string GetAll = Base + "/brands/";

            public const string UploadImage = Base + "/brands/uploadImageTest";

            public const string GetImage = Base + "/brands/GetImageTest";

            public const string Add = Base + "/brands/add";

            public const string Update = Base + "/brands/Update";

            public const string Delete = Base + "/brands/Delete";

            public const string GetByUserID = Base + "/brands/GetByUserID";
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

    }
}

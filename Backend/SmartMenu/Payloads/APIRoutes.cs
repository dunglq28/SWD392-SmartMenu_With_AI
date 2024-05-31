namespace SmartMenu.Payloads
{
    public static class APIRoutes
    {
        public const string Base = "api";

        public static class SmartMenu
        {
            public const string GetAll = Base + "/weatherforecast/";
        }

        public static class AppUser
        {
            public const string GetAll = Base + "/appuser/";

            public const string GetByID = Base + "/appuser/get-by-id";

            public const string Update = Base + "/appuser/update";

            public const string Delete = Base + "/appuser/delete";

            public const string Add = Base + "/appuser/add";
        }

        public static class Brand
        {
            public const string GetAll = Base + "/brands/";

            public const string UploadImage = Base + "/brands/uploadImageTest";

            public const string GetImage = Base + "/brands/GetImageTest";

            public const string Add = Base + "/brands/add";

            public const string Update = Base + "/brands/Update";

        }

        public static class Authentication
        {
            public const string Login = Base + "/authentication/login";

            public const string RefreshToken = Base + "/authentication/refreshtoken";
        }

    }
}

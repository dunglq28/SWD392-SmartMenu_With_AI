namespace SmartMenu.Payloads
{
    public static class APIRoutes
    {
        public const string Base = "api";

        public static class SmartMenu
        {
            public const string GetAll = Base + "/weatherforecast/";
        }

        public static class Brand
        {
            public const string GetAll = Base + "/brands/";

            public const string UploadImage = Base + "/brands/uploadImageTest";

            public const string GetImage = Base + "/brands/GetImageTest";
        }

        public static class Authentication
        {
            public const string Login = Base + "/authentication/login";

            public const string RefreshToken = Base + "/authentication/refreshtoken";
        }

    }
}

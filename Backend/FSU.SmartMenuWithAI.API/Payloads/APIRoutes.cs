﻿namespace FSU.SmartMenuWithAI.API.Payloads
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

            public const string RefreshToken = Base + "/authentication/refresh-token";
        }

        public static class AppUser
        {
            public const string GetAll = Base + "/app-users/";

            public const string GetByID = Base + "/app-users/get-by-id";

            public const string Update = Base + "/app-users/";

            public const string Delete = Base + "/app-users/";

            public const string Add = Base + "/app-users/";
        }

        public static class Brand
        {
            public const string GetAll = Base + "/brands/";

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
            public const string GetAll = Base + "/attributes/";

            public const string Add = Base + "/attributes/add";

            public const string Update = Base + "/attributes/update";

            public const string Delete = Base + "/attributes/delete";
        }
        public static class Product
        {
            public const string GetAll = Base + "/products/";

            public const string Add = Base + "/products/";

            public const string Update = Base + "/products/";

            public const string Delete = Base + "/products/";

            public const string GetByID = Base + "/products/get-by-id";
        }
    }
}

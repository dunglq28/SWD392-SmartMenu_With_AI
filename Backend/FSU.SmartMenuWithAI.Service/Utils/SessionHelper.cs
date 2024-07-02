using FSU.SmartMenuWithAI.Service.Utils.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Service.Utils
{
    public class SessionHelper
    {
        public static string GetSession()
        {
            var session = string.Empty;
            var thisTime = DateTime.Now.Hour;
            switch (thisTime)
            {
                case int n when (n >= 6 && n <= 10):
                    session = SessionInDay.Morning.ToString();
                    break;
                case int n when (n >= 10 && n <= 13):
                    session = SessionInDay.Noon.ToString();
                    break;
                case int n when (n >= 14 && n <= 17):
                    session = SessionInDay.Morning.ToString();
                    break;
                case int n when (n >= 18 && n <= 23):
                    session = SessionInDay.Morning.ToString();
                    break;
            }
            return session;
        }
    }
}

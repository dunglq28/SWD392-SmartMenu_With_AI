using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Service.Utils
{
    public class AverageAge
    {
        public static int CalAverageAge(int AgeFrom, int AgeTo)
        {
            
            double average = (AgeFrom + AgeTo) / 2.0; 
            int roundedAverage = (int)Math.Round(average, MidpointRounding.AwayFromZero);

            return roundedAverage;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DecorationManagement.Common
{
    public static class ConvertModel
    {
        /// <summary>
        /// ConvertMoudle
        /// </summary>
        /// <typeparam name="TK"></typeparam>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="to"></param>
        public static void ConvertMoudle<TK, T>(TK source, T to)  where T : class 
        {
            foreach (PropertyInfo info in typeof(TK).GetProperties())
            {
                foreach (PropertyInfo infoTemp in typeof(T).GetProperties())
                {
                    if (info.Name.Equals(infoTemp.Name))
                    {
                        infoTemp.SetValue(to, info.GetValue(source,null), null);
                    }
                }
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DecorationManagement.Installer
{
    public interface ICacheManger
    {
        void Add(string key, object value);
        void Remove(string key);
        T Get<T>(string key);
        bool KeyExist(string key);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DecorationManagement.Models
{
    public class PagingInfo<T> where T : class
    {
        public IEnumerable<T> DataSource { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public int PageCount { get; set; }


        public bool HasPrev { get { return PageIndex > 1; } }

        public bool HasNext { get { return PageIndex < PageCount; } }

        public PagingInfo(int pageSize, IList<T> dataSource)
        {
            PageSize = pageSize > 1 ? pageSize : 1;
            DataSource = dataSource;
            PageCount = (int)Math.Ceiling(dataSource.Count() / (double)pageSize);
        }

        public IList<T> GetPagingData()
        {
            return DataSource.Skip((PageIndex - 1) * PageSize).Take(PageSize).ToList();
        }
    }
}
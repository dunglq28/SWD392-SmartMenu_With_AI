using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Repository.Repositories
{
    public class CustomerSegmentRepository : GenericRepository<CustomerSegment>, ICustomerSegmentRepository
    {
        private readonly SmartMenuContext _context;
        private readonly IConfiguration _configuration;

        public CustomerSegmentRepository(SmartMenuContext context, IConfiguration configuration) : base(context)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<IEnumerable<CustomerSegment>> Get(
           Expression<Func<CustomerSegment, bool>> filter = null!,
           Func<IQueryable<CustomerSegment>, IOrderedQueryable<CustomerSegment>> orderBy = null!,
           int? pageIndex = null,
           int? pageSize = null)
        {
            IQueryable<CustomerSegment> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            query = query.Include(cs => cs.SegmentAttributes).ThenInclude(sa => sa.Attribute);


            if (orderBy != null)
            {
                query = orderBy(query);
            }

            // Implementing pagination
            if (pageIndex.HasValue && pageSize.HasValue)
            {
                // Ensure the pageIndex and pageSize are valid
                int validPageIndex = pageIndex.Value > 0 ? pageIndex.Value - 1 : 0;
                int validPageSize = pageSize.Value > 0 ? pageSize.Value : 10; // Assuming a default pageSize of 10 if an invalid value is passed

                query = query.Skip(validPageIndex * validPageSize).Take(validPageSize);
            }
            return await query.ToListAsync();
        }
    }
}

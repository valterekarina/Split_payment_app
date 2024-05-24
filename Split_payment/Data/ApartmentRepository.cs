using Split_payment.Models;
using System.Linq;

namespace Split_payment.Data
{
    public class ApartmentRepository : IApartmentRepository
    {
        private readonly AppDbContext _context;

        public ApartmentRepository(AppDbContext context)
        {
            _context = context;
        }
        public Apartment Create(Apartment apartment)
        {
            _context.Apartments.Add(apartment);
            apartment.Id = _context.SaveChanges();
            return apartment;
        }

        public Apartment GetById(int id)
        {
            return _context.Apartments.FirstOrDefault(u => u.Id == id);
        }

        public Apartment Update(Apartment apartment)
        {
            _context.Apartments.Update(apartment);
            _context.SaveChanges();
            return apartment;
        }

        public Apartment Delete(Apartment apartment)
        {
            _context.Apartments.Remove(apartment);
            _context.SaveChanges();
            return apartment;
        }
    }
}

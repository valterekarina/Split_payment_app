using Split_payment.Models;

namespace Split_payment.Data
{
    public interface IApartmentRepository
    {
        Apartment Create(Apartment apartment);
        Apartment Delete(Apartment apartment);
        Apartment GetById(int id);
        Apartment Update(Apartment apartment);
    }
}
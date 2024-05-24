using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class ApartmentCreateController : ControllerBase
    {
        private readonly IApartmentRepository _apartmentRepository;

        public ApartmentCreateController(IApartmentRepository apartmentRepository)
        {
            _apartmentRepository = apartmentRepository;
        }

        [HttpPost("create-apartment")]
        public IActionResult CreateApartment(Apartment model)
        {
            if (ModelState.IsValid)
            {
                var apartment = new Apartment
                {
                    City = model.City,
                    Street = model.Street,
                    HouseNo = model.HouseNo,
                    ApartmentNo = model.ApartmentNo,
                    Area = model.Area,
                    RentPrice = model.RentPrice,
                    Relation = model.Relation,
                };

                _apartmentRepository.Create(apartment);
                return Ok(apartment);
            }
            else
            {
                return BadRequest("invalid modelstate");
            }
        }
    }
}

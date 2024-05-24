using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class ApartmentEditController : ControllerBase
    {
        private readonly IApartmentRepository _apartmentRepository;

        public ApartmentEditController(IApartmentRepository apartmentRepository)
        {
            _apartmentRepository = apartmentRepository;
        }

        [HttpPut("edit-apatment")]
        public ActionResult EditApartment(Apartment model)
        {
            if (ModelState.IsValid)
            {
                var apartment = _apartmentRepository.GetById(model.Id);
                if (apartment == null)
                {
                    return NotFound("apartment not found");
                }
                else
                {
                    apartment.City = model.City;
                    apartment.Street = model.Street;
                    apartment.HouseNo = model.HouseNo;
                    apartment.ApartmentNo = model.ApartmentNo;
                    apartment.Area = model.Area;
                    apartment.RentPrice = model.RentPrice;
                    apartment.Relation = model.Relation;

                    _apartmentRepository.Update(apartment);
                    return Ok(apartment);
                }
            }
            else
            {
                return BadRequest("invalid modelstate");
            }
        }
    }
}

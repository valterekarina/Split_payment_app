using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserCreateController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserCreateController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("create-user")]
        public IActionResult CreateUser(User model)
        {
            if (ModelState.IsValid)
            {
                var user = new User
                {
                    Name = model.Name,
                    Email = model.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
                    Role = "user",
                    Phone = model.Phone,
                    LivingArea = model.LivingArea,
                    ApartmentId = model.ApartmentId,
                    IsApproved = "not approved",
                };

                _userRepository.Create(user);
                return Ok(user);
            }
            else
            {
                return BadRequest("invalid modelstate");
            }
        }
    }
}

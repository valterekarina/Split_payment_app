using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserUpdateProfileController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserUpdateProfileController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPut("update-profile")]
        public IActionResult UpdateProfile(UserUpdateProfileModel model)
        {
            if (ModelState.IsValid)
            {
                var user = _userRepository.GetByEmail(model.EmailOld);
                if (user != null)
                {
                    user.Name = model.Name;
                    user.Email = model.Email;
                    user.Phone = model.Phone;
                    user.LivingArea = model.LivingArea;

                    _userRepository.Update(user);

                    return Ok(user);
                }
                else
                {
                    return NotFound("User Not Found");
                }
            }
            else
            {
                return BadRequest("Invalid modelstate");
            }
        }
    }
}

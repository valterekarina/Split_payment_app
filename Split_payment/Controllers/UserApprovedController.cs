using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserApprovedController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserApprovedController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPut("approve-user")]
        public IActionResult UpdateProfile(UserUpdateProfileModel model)
        {
            if (ModelState.IsValid)
            {
                var user = _userRepository.GetByEmail(model.EmailOld);
                if (user != null)
                {
                    user.IsApproved = "approved";

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

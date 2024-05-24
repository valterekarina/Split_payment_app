using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserOwnerDeleteController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserOwnerDeleteController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpDelete("delete-other")]
        public IActionResult Delete(UserDeleteProfileModel model)
        {
            if (ModelState.IsValid)
            {
                var user = _userRepository.GetByEmail(model.EmailOld);

                if (user == null)
                {
                    return NotFound("user not found");
                }

                _userRepository.Delete(user);
                return Ok("user deleted");
            }
            else
            {
                return BadRequest("Invalid modelstate");
            }
        }
    }
}

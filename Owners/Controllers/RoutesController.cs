using System.Web.Mvc;

namespace Owners.Controllers
{
	public class RoutesController : Controller
	{
		public ActionResult Owners()
		{
			return View();
		}

		public ActionResult Pets(int ownerId = 1)
		{
			ViewBag.OwnerId = ownerId;

			return View();
		}
	}
}
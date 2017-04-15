using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Owners.Models;

namespace Owners.Controllers
{
	public class OwnersController : ApiController
	{
		private DataContext db = new DataContext();

		// GET api/owners
		public IEnumerable<Owner> Get()
		{
			var owners = db.Owners.ToList();

			return owners;
		}

		// GET api/owners/5
		public Owner Get(int id)
		{
			var owner = db.Owners.FirstOrDefault(o => o.Id == id);
			return owner;
		}

		// POST api/values
		public void Post(Owner ownerObj)
		{
			var ownerName = ownerObj.Name;
			if (!db.Owners.Any(o => o.Name == ownerName) && !string.IsNullOrWhiteSpace(ownerName))
			{
				var owner = new Owner()
							{
								Name = ownerObj.Name
							};

				db.Owners.Add(owner);
				db.SaveChanges();
			}
		}

		// DELETE api/owners/5
		public void Delete(int id)
		{
			var ownerToRemove = db.Owners.FirstOrDefault(o => o.Id == id);
			if (ownerToRemove != null)
			{
				if (ownerToRemove.Pets.Any())
				{
					var ownersPets = db.Pets.Where(p => p.OwnerId == ownerToRemove.Id);
					db.Pets.RemoveRange(ownersPets);
				}
				db.Owners.Remove(ownerToRemove);
				db.SaveChanges();
			}
		}
	}
}
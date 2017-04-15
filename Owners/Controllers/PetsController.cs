using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Owners.Models;

namespace Owners.Controllers
{
	public class PetsController : ApiController
	{
		private DataContext db = new DataContext();

		// GET: api/Pets
		public IEnumerable<Pet> GetPets()
		{
			var pets = db.Pets.ToList();

			return pets;
		}

		// GET: api/Pets/5
		public IHttpActionResult GetPet(int id)
		{
			var pets = db.Pets;
			var filteredPets = pets.Where(p => p.OwnerId == id).ToList();

			return Ok(filteredPets);
		}
		
		// POST: api/Pets
		[ResponseType(typeof(Pet))]
		public void PostPet(Pet petObj)
		{
			var petName = petObj.Name;
			var ownerId = petObj.OwnerId;
			if (!db.Pets.Any(p => p.Name == petName) && !string.IsNullOrWhiteSpace(petName))
			{
				var pet = new Pet()
						  {
							  Name = petName,
							  OwnerId = ownerId
						  };

				db.Pets.Add(pet);
				db.SaveChanges();
			}
		}

		// DELETE: api/Pets/5
		[ResponseType(typeof(Pet))]
		public void DeletePet(int id)
		{
			var petToRemove = db.Pets.FirstOrDefault(p => p.Id == id);
			if (petToRemove != null)
			{
				db.Pets.Remove(petToRemove);
				db.SaveChanges();
			}
		}
	}
}
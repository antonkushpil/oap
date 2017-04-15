using System.Data.Entity;
using Owners.Models;

namespace Owners.Controllers
{
	public class DataContext : DbContext
	{
		public DbSet<Owner> Owners { get; set; }
		public DbSet<Pet> Pets { get; set; }
	}
}
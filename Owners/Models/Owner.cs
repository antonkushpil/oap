using System.Collections.Generic;

namespace Owners.Models
{
	public class Owner
	{
		public Owner()
		{
			Pets = new List<Pet>();
		}

		public int Id { get; set; }
		public string Name { get; set; }
		public virtual List<Pet> Pets { get; set; }
	}
}
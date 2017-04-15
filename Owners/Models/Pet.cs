namespace Owners.Models
{
	public class Pet
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int OwnerId { get; set; }
	}
}
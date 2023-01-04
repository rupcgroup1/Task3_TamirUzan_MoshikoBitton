using System.Collections.Generic;
using WebApplication7.Models;
using WebApplication7.Models.DAL;
namespace WebApplication7.Models
{
    public class Ingredient
    {
        private int id;
        private string name;
        private string img;
        private int calories;

        public Ingredient() { }

        public Ingredient(int id, string name, string img, int calories)
        {
            this.Id = id;
            this.Name = name;
            this.Img = img;
            this.Calories = calories;
        }

        public Ingredient(string name, string img, int calories)
        {
            this.Name = name;
            this.Img = img;
            this.Calories = calories;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Img { get => img; set => img = value; }
        public int Calories { get => calories; set => calories = value; }

        public List<Ingredient> GetAllIngredients()
        {
            DataServices ds = new DataServices();
            return ds.GetAllIngredients();
        }

        public Ingredient GetIngredientById(int id)
        {
            DataServices ds = new DataServices();
            return ds.GetIngredientById(id);
        }

        public int InsertIngredient()
        {
            DataServices ds = new DataServices();
            return ds.InsertIngredient(this);
        }
    }
}
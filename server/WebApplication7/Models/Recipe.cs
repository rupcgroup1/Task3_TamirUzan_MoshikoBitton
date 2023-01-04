using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication7.Models.DAL;

namespace WebApplication7.Models
{
    public class Recipe
    {
        private int id;
        private string name;
        private string img;
        private string cookingMethod;
        private string time;
        private List<int> ingredientsList;

        public Recipe()
        {

        }

        public Recipe(int id, string name, string img, string cookingMethod, string time, List<int> ingredientsList)
        {
            this.Id = id;
            this.Name = name;
            this.Img = img;
            this.CookingMethod = cookingMethod;
            this.Time = time;
            this.IngredientsList = ingredientsList;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Img { get => img; set => img = value; }
        public string CookingMethod { get => cookingMethod; set => cookingMethod = value; }
        public string Time { get => time; set => time = value; }
        public List<int> IngredientsList { get => ingredientsList; set => ingredientsList = value; }

        public List<Recipe> GetAllRecipes()
        {
            DataServices ds = new DataServices();
            return ds.GetRecipes();
        }

        public List<Ingredient> GetIngredientsByRecipeId(int id)
        {
            DataServices ds = new DataServices();
            return ds.GetIngredientsByRecipeId(id);
        }

        public int InsertRecipe()
        {
            DataServices ds = new DataServices();
            return ds.InsertRecipe(this);
        }
    }
}
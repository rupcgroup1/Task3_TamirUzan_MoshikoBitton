using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace WebApplication7.Models.DAL
{
    public class DataServices
    {
        private SqlConnection Connect()
        {
            // read the connection string from the web.config file
            string connectionString = WebConfigurationManager.ConnectionStrings["DB"].ConnectionString;

            // create the connection to the db
            SqlConnection con = new SqlConnection(connectionString);

            // open the database connection
            con.Open();

            return con;
        }

        // The first getting all the recipes from the DB
        public List<Recipe> GetRecipes()
        {
            SqlConnection con = Connect();

            // Create Command
            SqlCommand command = CreateSelectCommand(con);

            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);

            List<Recipe> recipes = new List<Recipe>();

            while (dr.Read())
            {
                int id = Convert.ToInt32(dr["id"]);
                string name = dr["name"].ToString();
                string cookingMethod = dr["cookingMethod"].ToString();
                string img = dr["img"].ToString();
                string time = dr["time"].ToString();
                recipes.Add(new Recipe(id, name, img, cookingMethod, time,null));

            }

            con.Close();
            return recipes;
        }

        // Get recipes sqlCommand.
        private SqlCommand CreateSelectCommand(SqlConnection con)
        {

            SqlCommand command = new SqlCommand();
            command.CommandText = "SPgetRecipes";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }
        

        // The first getting all the ingredients from the DB
        public List<Ingredient> GetAllIngredients()
        {
            SqlConnection con = Connect();

            // Create Command
            SqlCommand command = CreateSelectIngredientCommand(con);

            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);

            List<Ingredient> ingredients = new List<Ingredient>();

            while (dr.Read())
            {
                int id = Convert.ToInt32(dr["id"]);
                string name = dr["name"].ToString();
                string img = dr["img"].ToString();
                int calories = Convert.ToInt32(dr["calories"]);
                ingredients.Add(new Ingredient(id, name, img, calories));
            }

            con.Close();
            return ingredients;
        }

        // Get All Ingredients sqlCommand.
        private SqlCommand CreateSelectIngredientCommand(SqlConnection con)
        {

            SqlCommand command = new SqlCommand();
            command.CommandText = "SPgetIngredients";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }


        //Get Ingredient by id.
        public Ingredient GetIngredientById(int id)
        {
            SqlConnection con = Connect();

            // Create Command
            SqlCommand command = CreateSelectGetIngredientCommand(con, id);

            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);

            Ingredient ingredient = null;

            while (dr.Read())
            {
                string name = dr["name"].ToString();
                string img = dr["img"].ToString();
                int calories = Convert.ToInt32(dr["calories"]);
                ingredient = new Ingredient(id, name, img, calories);
            }

            con.Close();
            return ingredient;
        }

        // Get ingredient by id sqlCommand.
        private SqlCommand CreateSelectGetIngredientCommand(SqlConnection con, int id)
        {

            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@id", id);
            command.CommandText = "SPgetIngredientById";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        //Insert a new ingredient.
        public int InsertIngredient(Ingredient ingredient)
        {
            // Connect
            SqlConnection con = Connect();

            // Create Command
            SqlCommand command = CreateInsertIngredientCommand(con, ingredient);

            // Execute
            int numAffected = command.ExecuteNonQuery();

            // Close Connection

            con.Close();

            return numAffected;
        }

        //Creating insert command for insert a new ingredient.
        private SqlCommand CreateInsertIngredientCommand(SqlConnection con, Ingredient ingredient)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@name", ingredient.Name);
            command.Parameters.AddWithValue("@img", ingredient.Img);
            command.Parameters.AddWithValue("@calories", ingredient.Calories);
            command.CommandText = "SPInsertIngredient";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        //Insert a new Recipe.
        public int InsertRecipe(Recipe recipe)
        {
            // Connect
            SqlConnection con = Connect();

            // Create Command
            SqlCommand command = CreateInsertRecipeCommand(con, recipe);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            int id = 0;
            while (dr.Read())
            {
                id = Convert.ToInt32(dr["id"]);
            }

            for (int i = 0; i < recipe.IngredientsList.Count(); i++)
                InsertIngredientToRecipe(id, recipe.IngredientsList[i]);

            // Close Connection
            con.Close();

            return id;
        }

        //Creating insert command for insert a new recipe.
        private SqlCommand CreateInsertRecipeCommand(SqlConnection con, Recipe recipe)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@name", recipe.Name);
            command.Parameters.AddWithValue("@img", recipe.Img);
            command.Parameters.AddWithValue("@cookingMethod", recipe.CookingMethod);
            command.Parameters.AddWithValue("@time", recipe.Time);
            command.CommandText = "SPInsertRecipe";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        public int InsertIngredientToRecipe(int recId, int ingId)
        {
            // Connect
            SqlConnection con = Connect();


            // Create Command
            SqlCommand command = CreateInsertIngredientToRecipeCommand(con, recId, ingId);

            // Execute
            int numAffected = command.ExecuteNonQuery();

            // Close Connection

            con.Close();

            return numAffected;
        }

        //Creating insert command for insert a new eecipe.
        private SqlCommand CreateInsertIngredientToRecipeCommand(SqlConnection con,int recId, int ingId)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@recId", recId);
            command.Parameters.AddWithValue("@ingId", ingId);
            command.CommandText = "SPInsertIngredientToRecipe";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        // Getting the ingredients by recipe id.
        public List<Ingredient> GetIngredientsByRecipeId(int id)
        {
            // Connect
            SqlConnection con = Connect();

            // Create Command
            SqlCommand command = CreateSelectIngredientsByRecipeIdCommand(con, id);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);

            List<int> ids = new List<int>();
            while (dr.Read())
            {
                int idToAdd = Convert.ToInt32(dr["ingredientId"]);
                ids.Add(idToAdd);
            }

            List<Ingredient> ingredients = new List<Ingredient>();
            for (int i = 0; i < ids.Count(); i++)
                ingredients.Add(GetIngredientById(ids[i]));
            

            con.Close();
            return ingredients;
        }

        //Creating insert command for getting all ingredients ids from specific recipe.
        private SqlCommand CreateSelectIngredientsByRecipeIdCommand(SqlConnection con, int id)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@id", id);
            command.CommandText = "SPGetIngredientsIdFromRecipe";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

    }
}
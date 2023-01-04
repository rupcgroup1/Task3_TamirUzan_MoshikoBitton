using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using WebApplication7.Models;


namespace WebApplication7.Controllers
{
    public class RecipesController : ApiController
    {
        //Get all Recipes
        public IHttpActionResult Get()
        {
            try
            {
                Recipe r = new Recipe();
                return Ok(r.GetAllRecipes());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //Getting ingredients list by recipe id.
        public IHttpActionResult Get(int id)
        {
            try
            {
                Recipe r = new Recipe();
                return Ok(r.GetIngredientsByRecipeId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }
        //Inserting an recipe
        public IHttpActionResult Post([FromBody]Recipe recipe)
        {
            try
            {
                int res = recipe.InsertRecipe();
                if (res > 0)
                    return Ok(res);
                return BadRequest("Failed");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

    }
}
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
    public class IngredientsController : ApiController
    {
        //Get all Ingredients
        public IHttpActionResult Get()
        {
            try
            {
                Ingredient r = new Ingredient();
                return Ok(r.GetAllIngredients());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Getting ingredient by id.
        public IHttpActionResult Get(int id)
        {
            try
            {
                Ingredient r = new Ingredient();
                return Ok(r.GetIngredientById(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }
        //Insert ingredient.
        public IHttpActionResult Post([FromBody]Ingredient ingredient)
        {
            try
            {
                if (ingredient.InsertIngredient() == 1)
                    return Ok("Succeed");
                return BadRequest("Failed");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
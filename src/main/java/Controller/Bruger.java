package Controller;

import Logic.Mapper;
import Model.DAO.IUserDAO;
import Model.DAO.UserDAO_3_Database;
import Model.DTO.UserDTO;
import org.json.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;

import java.util.HashMap;

@Path("/bruger")
public class Bruger {
    private static IUserDAO iUserDAO;
    static {
        try {
            iUserDAO = new UserDAO_3_Database();
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            System.out.println(e);
        }
    }

    @GET
    public String getBrugerer() {
        try {
            //UserDTO user = iUserDAO.getUsers();
            return "kat";
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @GET
    @Path("{username}")
    public String getBruger(@PathParam("username") String username) {
        try {
            UserDTO user = iUserDAO.getUser(username);
            return "Du FANDT: " + ((user != null) ? user : "Ingen bruger");
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @POST
    public String createUser(String JSON_userDTO) {
        try{
            UserDTO userDTO = Mapper.mapUserDTO(JSON_userDTO);
            userDTO.generateUserId();
            iUserDAO.createUser(userDTO);
            return Mapper.mapUserDTO(userDTO);
        }
        catch (Exception e){
            return "Fejl i backend: " + e.toString();
        }
    }
}
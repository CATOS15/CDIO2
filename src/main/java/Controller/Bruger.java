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
            return "Brugeren " + userDTO.getUserName() + " blev oprettet med success!";
        }
        catch (Exception e){
            return "Fejl i backend: " + e.toString();
        }
    }

    @PUT
    @Path("{username}")
    public String editUser(@PathParam("username") String username, String JSON_userDTO) {
        try{
            UserDTO userDTO = Mapper.mapUserDTO(JSON_userDTO);
            UserDTO oldUserDTO = iUserDAO.getUser(username);
            userDTO.setUserId(oldUserDTO.getUserId());
            iUserDAO.updateUser(userDTO);
            return "Brugeren " + username + " blev redigeret med success!";
        }
        catch (Exception e){
            return "Fejl i backend: " + e.toString();
        }
    }

    @DELETE
    @Path("{username}")
    public String deleteUser(@PathParam("username") String username) {
        try{
            UserDTO oldUserDTO = iUserDAO.getUser(username);
            iUserDAO.deleteUser(oldUserDTO.getUserId());
            return "Brugeren " + oldUserDTO.getUserName() + " blev slettet med success!";
        }
        catch (Exception e){
            return "Fejl i backend: " + e.toString();
        }
    }
}
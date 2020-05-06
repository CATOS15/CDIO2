package backend;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.ResultSet;
import java.sql.SQLException;

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
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    public String createUser(JSONUser jsonUser) {
        return "Kat";
    }

}
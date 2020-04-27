package backend;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

@Path("/bruger")
public class Bruger {
    @GET
    @Path("{username}")
    public String getBruger(@PathParam("username") String username) {
        return "(mangler at blive implementeret) Du FANDT: " + username;
    }
}
package backend;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/bruger")
public class Bruger {
    @GET
    public String getBruger() {
        return "En eller anden bruger";
    }
}
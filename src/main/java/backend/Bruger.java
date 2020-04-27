package backend;

import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.io.*;
import java.nio.charset.StandardCharsets;

@Path("/bruger")
public class Bruger {
    @GET
    public String getBruger() {
        return "En eller anden bruger";
    }
}
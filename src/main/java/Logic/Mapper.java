package Logic;

import Model.DTO.UserDTO;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class Mapper {
    private static class Keys{
        //Det er vigtigt at disse nøgler matcher dem som bliver sendt fra frontend
        static final String username = "username";
        static final String password = "password";
        static final String cpr = "cpr";
        static final String roles = "roles";

        static final String users = "users";
    }

    public static UserDTO mapUserDTO(String jsonString){
        JSONObject jsonObject = new JSONObject(jsonString);
        List<String> roller = new ArrayList<>();
        try{
            JSONArray jsonRoller = jsonObject.getJSONArray(Keys.roles);
            for (int i = 0; i < jsonRoller.length(); i++) {
                roller.add(jsonRoller.getString(i));
            }
        }
        catch (Exception e){
            //Ikke et array så vi prøver med en enkelt værdi
            roller.add(jsonObject.getString(Keys.roles));
        }
        UserDTO userDTO = new UserDTO();
        userDTO.setUserName(jsonObject.getString(Keys.username));
        userDTO.setRoles(roller);
        userDTO.setCpr(jsonObject.getString(Keys.cpr));
        userDTO.setPassword(jsonObject.getString(Keys.password));
        return userDTO;
    }
    public static String mapUserDTO(UserDTO userDTO){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put(Keys.username, userDTO.getUserName());
        jsonObject.put(Keys.cpr, userDTO.getCpr());
        jsonObject.put(Keys.password, userDTO.getPassword());
        jsonObject.put(Keys.roles, userDTO.getRoles());
        return jsonObject.toString();
    }

    public static String mapUsersDTO(List<UserDTO> usersDTO){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put(Keys.users, usersDTO);
        return jsonObject.toString();
    }
}


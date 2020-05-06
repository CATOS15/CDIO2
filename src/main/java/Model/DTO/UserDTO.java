package Model.DTO;

import java.util.ArrayList;
import java.util.List;

public class UserDTO{
    private int	id;
    private String username;
    private String ini;
    private List<String> roles;
    private String cpr;
    private String password;

    public UserDTO() {
        this.roles = new ArrayList<>();
    }

    public int getUserId() {
        return id;
    }
    public void setUserId(int id) {
        this.id = id;
    }
    public String getUserName() {
        return username;
    }
    public void setUserName(String username) {
        this.username = username;
    }
    public String getIni() {
        return ini;
    }
    public void setIni(String ini) {
        this.ini = ini;
    }
    public String getCpr() { return cpr; }
    public void setCpr(String cpr) {
        this.cpr = cpr;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getRoles() {
        return roles;
    }
    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public void addRole(String role){
        this.roles.add(role);
    }
    public boolean removeRole(String role){
        return this.roles.remove(role);
    }

    @Override
    public String toString() {
        return "UserDTO [userId=" + id + ", userName=" + username + ", roles=" + roles + "]";
    }
}
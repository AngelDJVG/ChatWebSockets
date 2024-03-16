/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package entidades;

/**
 *
 * @author JGLAM
 */
public class Alumno {
    
    private String Nombre;
    private float Calificacion;

    public Alumno(String nombre, float calificacion) {
        this.Nombre = nombre;
        this.Calificacion = calificacion;
    }

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String nombre) {
        this.Nombre = nombre;
    }

    public float getCalificacion() {
        return Calificacion;
    }

    public void setCalificacion(float calificacion) {
        this.Calificacion = calificacion;
    }
}

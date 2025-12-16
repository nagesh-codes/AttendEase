package com.attendease.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "username"))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;

    @Column(nullable=false, unique=true)
    private String username; // username

    @Column(nullable=false)
    private String password; // hashed

    @Column(nullable=false, unique=true)
    private String email;
    
    @Column(nullable = false)
    private String role;

    public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public User() {}

    public User(String name,String username, String email, String password,String role) {
    	this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	// Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

	public String getEmail() { return email;	}

	public void setEmail(String email) { this.email = email; }

    
}

package com.NetoLanches.Tapiocas

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

@Entity
@Table(name = "filling")
data class Filling(
    @Id val id: Int,
    val idFood: Int,
    val name: String,
    val value: Float
)


interface fillingRepository: JpaRepository<Filling, Int> {
    @Query("select name, value from filling where id_food = :id", nativeQuery = true)
    fun getAllFillingById(@Param("id") id: Int): List<Map<String,Float>>
}
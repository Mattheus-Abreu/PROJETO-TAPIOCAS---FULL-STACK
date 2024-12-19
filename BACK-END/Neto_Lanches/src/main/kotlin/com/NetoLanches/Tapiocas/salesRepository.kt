package com.NetoLanches.Tapiocas

import jakarta.persistence.*
import org.springframework.context.annotation.Description
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

@Entity
@Table(name = "sales")
data class Sales(
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id val id: Int?,
    val idfood: Int,
    val cpf: String,
    @Column(name = "datesale", insertable = false, updatable = false)
    val datesale: String? = null,
    val description: String,
    val value: Float
)


interface salesRepository: JpaRepository<Sales, Int> {
    @Query("select * from sales where cpf = :cpf", nativeQuery = true)
    fun getAllSalesByCpfClient(@Param ("cpf") cpf: String): List<Sales>
}

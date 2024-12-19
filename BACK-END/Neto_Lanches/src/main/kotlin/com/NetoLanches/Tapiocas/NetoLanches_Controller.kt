package com.NetoLanches.Tapiocas

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.Optional

@CrossOrigin
@RestController
class NetoLanches_Controller(val foodsRepository: FoodRepository,
                             val fillingRepository: fillingRepository,
                             val salesRepository: salesRepository) {


    @GetMapping("/food")
    fun getFillingsByFoodId(@RequestParam("id") id: Int = 0): Map<String,Any> {
        try {
            val food: Optional<Foods?> = foodsRepository.findById(id)
            val filling: List<Map<String,Float>> = fillingRepository.getAllFillingById(id)

            val response: Map<String,Any> =
                mapOf(
                    "value" to food.get().value,
                    "filling" to filling
                )


            return response
        }catch (e: Exception){
            return mapOf("Error" to e.message.toString())
        }

    }

    @GetMapping("/history")
    fun getAllSaleByCpfClient(@RequestParam("cpf") cpf: String):List<Sales>{
        return salesRepository.getAllSalesByCpfClient(cpf)
    }


//    @GetMapping("/history")
//    fun getAllSaleByCpfClient():List<Sales>{
//        return salesRepository.findAll()
//    }




    @GetMapping("/payment")
    fun payment(@RequestParam("idFood")idfood:Int,
                @RequestParam("cpf")cpf: String,
                @RequestParam("description")description:String,
                @RequestParam("value")value:Float
                ):String{

        val cpfAux = cpf.replace(" ","")
        if (!(cpfAux.all { it.isDigit() }) || cpfAux.isEmpty())
            return "Compra não foi realizada o CPF deve ter apenas números"
        try {
            val sale = Sales(
                id = null,
                idfood = idfood,
                cpf = cpfAux,
                datesale = null,
                description = description,
                value = value
            )
            salesRepository.save(sale)
            return "Pagamento realizado com sucesso"

        }catch ( e:Exception){
            return "Compra não realizada"
        }

    }


}
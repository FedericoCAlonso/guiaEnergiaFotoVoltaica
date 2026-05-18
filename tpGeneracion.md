# Diseño de sistema de generación fotovoltaica on-grid
## Cliente: MEHCCO SA — Tarifa T2 EDENOR — Gral. San Martín, PBA

## 1. Análisis del estado actual
### 1.1 Descripción del suministro

El cliente cuenta con un suministro tarifa 2 contratado a la empresa EDENOR, con una potencia contratada de 16kW. 
Actualmente muestra un excendente en el consumo de potencia dando como consecuenca el pago de sobrecargos que representan aproximadamente un tercio del costo actual.

### 1.2 Análisis del consumo histórico

Mes|Cargo fijo|Potencia Consumida \[kW\]|Potencia Contratada \[kW\]|Potencia adquirida \[kW\]|Potencia Excedida \[kW\]|Cargo por potencia contratada 	Cargo por potencia adquirida	Cargo por potencia Excedida	Energía activa [kWh]	Cargo variable	Stot	Impuestos	Tot. 
Enero	40.691,06	44,00	16	16	28	 $ 305.102,40 	 $ 299.218,00 	 $ 800.893,80 	4864	 $ 400.618,50 	 $ 1.805.832,70 	 $ 675.832,89 	 $ 2.481.665,58 
Febrero	40.691,06	49,00	16	16	33	 $ 305.102,40 	 $ 299.218,00 	 $ 943.910,55 	5291	 $ 435.787,92 	 $ 1.984.018,87 	 $ 742.519,06 	 $ 2.726.537,94 
Marzo	40.691,06	35,00	16	16	19	 $ 305.102,40 	 $ 299.218,00 	 $ 543.463,65 	4646	 $ 382.663,14 	 $ 1.530.447,19 	 $ 572.769,86 	 $ 2.103.217,06 
Abril	40.691,06	34,68	16	16	18,68	 $ 305.102,40 	 $ 299.218,00 	 $ 534.310,58 	4.173	 $ 343.704,97 	 $ 1.482.335,95 	 $ 554.764,23 	 $ 2.037.100,18 

**Referencias**

* $Cf$: Cargo fijo
* $P_{cm}$: Potencia Consumida \[kW\]
* $P_{ct}$: Potencia Contratada \[kW\]
* $P_{a}$: Potencia Adquirida \[kW\]
* $P_{e}$: Potencia Excedida \[kWw\]
* $C_{P_{ct}}$: Cargo por potencia contratada \[$\]
* $C_{P_a}$: Cargo por potencia adquirida \[$\]
* $C_{P_e}$: Cargo por potencia excedida \[$\]
* 


### 1.3 Perfil de carga — supuestos y justificación
### 1.4 Composición de la factura eléctrica
### 1.5 Problemas identificados
         — Exceso de potencia contratada vs. demanda real
         — Cargo por potencia excedida como componente dominante
### 1.6 Costo efectivo actual del kWh
         — Este valor es la referencia económica de toda la propuesta

## 2. Recurso solar del sitio
### 2.1 Ubicación geográfica y datos del emplazamiento
### 2.2 Fuente de datos de irradiancia (PVGIS)
### 2.3 HPS mensual y promedio anual
### 2.4 Temperatura mínima y máxima del sitio
### 2.5 Inclinación y orientación propuesta

## 3. Propuesta de potencia a instalar
### 3.1 Criterios de dimensionado
### 3.2 Restricciones regulatorias (Ley 27.424)
### 3.3 Potencia FV propuesta y justificación económica
### 3.4 Fracción solar estimada

## 4. Selección del inversor
### 4.1 Criterios de selección
### 4.2 Inversor seleccionado — análisis del datasheet
### 4.3 Parámetros relevantes para el diseño del array DC
### 4.4 Potencia DC resultante (oversizing)

## 5. Selección de paneles y diseño del array
### 5.1 Criterios de selección
### 5.2 Panel seleccionado — análisis del datasheet
### 5.3 Cálculo de strings en serie
         — Condición 1: temperatura mínima — límite de Voc (seguridad absoluta)
         — Condición 2: temperatura mínima — límite MPPT superior
         — Condición 3: temperatura máxima — límite MPPT inferior
### 5.4 Cálculo de strings en paralelo
### 5.5 Verificación en peores casos
         — Sobretensión en frío
         — Subtensión en calor
         — Sobrecorriente (factor 1,25)
         — Oversizing DC/AC resultante
### 5.6 Esquema unifilar del array DC

## 6. Cableado y protecciones
### 6.1 Cableado DC — sección y caída de tensión
### 6.2 Cableado AC — sección y caída de tensión
### 6.3 Protecciones DC (fusibles, DPS, seccionadores)
### 6.4 Protecciones AC (termomagnético, DPS, anti-isla)
### 6.5 Puesta a tierra

## 7. Estimación de generación anual
### 7.1 Performance Ratio — desglose de pérdidas
### 7.2 Generación mensual y anual estimada
### 7.3 Verificación cruzada con PVGIS
### 7.4 Fracción solar resultante

## 8. Análisis económico
### 8.1 Presupuesto de la instalación
### 8.2 Ahorro por energía desplazada
### 8.3 Ahorro por reducción de potencia excedida
### 8.4 Ahorro total anual
### 8.5 Costo del kWh solar generado (LCOE)
### 8.6 Comparativa: costo actual vs. costo con sistema FV
### 8.7 Payback simple y análisis de sensibilidad tarifaria
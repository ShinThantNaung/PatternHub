# Creation of different payment processors with factory design pattern.

This folder deals with the creation of different concrete payment processors with the different concrete factories

## Factories

The PaymentProcessorFactory interface serves as the template for different concrete factories. It has createPaymentProcessor() abstract method which returns different payment processors.

## Payment Processors

The PaymentProcessor itnerface serves as the template for different concrete payment processes. It currently demonstrate the logic inside concrete payment processsors with pay() method, which log the paying method.

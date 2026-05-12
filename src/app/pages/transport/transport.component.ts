import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var L: any;

@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent {
  selectedFilter = 'All Routes';
  filters = ['All Routes', 'Jeepney', 'Taxi'];
  selectedRoute: any = null;
  showMap = false;
  mapInstance: any = null;
  routingControl: any = null;
  
  routes = [
    
    { 
      code: 'R-01', 
      name: 'Mines View Line', 
      from: 'Baguio City Center', 
      to: 'Mines View Park', 
      fare: 13, 
      schedule: '5:30 AM – 8:00 PM', 
      stops: 'Session Road → Burnham Park → Mines View',
      fullRoute: 'City Center → Session Road → Burnham Park → Mines View Park',
      landmarks: ['Session Road', 'Burnham Park', 'Mines View Park', 'Good Shepherd'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4030, 120.5970],
      endCoords: [16.3900, 120.6150]
    },
    { 
      code: 'R-02', 
      name: 'Navy Base – Pacdal Liteng', 
      from: 'Navy Base', 
      to: 'Pacdal Liteng', 
      fare: 13, 
      schedule: '5:30 AM – 7:30 PM', 
      stops: 'Naval Base → Pacdal Circle → Liteng',
      fullRoute: 'Navy Base → Pacdal Circle → Wright Park → Liteng',
      landmarks: ['Navy Base', 'Pacdal Circle', 'Wright Park', 'Liteng'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.3950, 120.5850],
      endCoords: [16.3880, 120.6080]
    },
    { 
      code: 'R-03', 
      name: 'Pacdal – Maria Basa – Tiptone', 
      from: 'Pacdal', 
      to: 'Tiptone', 
      fare: 13, 
      schedule: '5:30 AM – 7:30 PM', 
      stops: 'Pacdal → Maria Basa → Tiptone',
      fullRoute: 'Pacdal → Maria Basa Road → Tiptone',
      landmarks: ['Pacdal', 'Maria Basa', 'Tiptone', 'Botanical Garden'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.3880, 120.6080],
      endCoords: [16.3950, 120.6100]
    },
    { 
      code: 'R-04', 
      name: 'Country Club – Lucnab – Eastern Link', 
      from: 'Country Club', 
      to: 'Eastern Link', 
      fare: 15, 
      schedule: '6:00 AM – 7:00 PM', 
      stops: 'Country Club → Lucnab → Eastern Link',
      fullRoute: 'Country Club → Lucnab → Eastern Link Road',
      landmarks: ['Baguio Country Club', 'Lucnab', 'Eastern Link'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.3980, 120.6200],
      endCoords: [16.4050, 120.6250]
    },
    { 
      code: 'R-05', 
      name: 'Loakan Airport – EPZA', 
      from: 'Loakan Airport', 
      to: 'EPZA', 
      fare: 15, 
      schedule: '5:30 AM – 7:30 PM', 
      stops: 'Loakan Airport → EPZA',
      fullRoute: 'Loakan Airport → Loakan Road → EPZA',
      landmarks: ['Loakan Airport', 'EPZA', 'Philippine Military Academy'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.3500, 120.6200],
      endCoords: [16.3700, 120.6100]
    },
    { 
      code: 'R-06', 
      name: 'PNR – Green Water – Hillside – Gabriela – Dagsian', 
      from: 'PNR', 
      to: 'Dagsian', 
      fare: 13, 
      schedule: '5:00 AM – 8:00 PM', 
      stops: 'PNR → Greenwater → Hillside → Gabriela → Dagsian',
      fullRoute: 'PNR → Greenwater → Hillside → Gabriela Silang → Dagsian',
      landmarks: ['PNR', 'Greenwater', 'Hillside', 'Gabriela Silang', 'Dagsian'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4100, 120.5900],
      endCoords: [16.3950, 120.5950]
    },
    { 
      code: 'R-07', 
      name: 'Camp John Hay – Scout Barrio', 
      from: 'Camp John Hay', 
      to: 'Scout Barrio', 
      fare: 13, 
      schedule: '6:00 AM – 7:00 PM', 
      stops: 'Camp John Hay → Scout Barrio',
      fullRoute: 'Camp John Hay → Scout Barrio',
      landmarks: ['Camp John Hay', 'Scout Barrio', 'The Mansion'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.3980, 120.6050],
      endCoords: [16.4080, 120.5950]
    },
    { 
      code: 'R-08', 
      name: 'BGH – Campo Sioco', 
      from: 'BGH', 
      to: 'Campo Sioco', 
      fare: 12, 
      schedule: '5:30 AM – 7:30 PM', 
      stops: 'BGH → Campo Sioco',
      fullRoute: 'Baguio General Hospital → Campo Sioco',
      landmarks: ['BGH', 'Campo Sioco', 'Engineers Hill'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4050, 120.6000],
      endCoords: [16.4200, 120.5950]
    },
    { 
      code: 'R-09', 
      name: 'City Camp District Line', 
      from: 'City Camp', 
      to: 'City Center', 
      fare: 12, 
      schedule: '5:00 AM – 8:00 PM', 
      stops: 'City Camp → City Center',
      fullRoute: 'City Camp → Baguio City Center',
      landmarks: ['City Camp', 'Baguio City Market', 'Session Road'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4200, 120.5950],
      endCoords: [16.4030, 120.5970]
    },
    { 
      code: 'R-10', 
      name: 'PMA – Kias Line', 
      from: 'PMA', 
      to: 'Kias', 
      fare: 16, 
      schedule: '5:30 AM – 7:00 PM', 
      stops: 'PMA → Kias',
      fullRoute: 'Philippine Military Academy → Kias',
      landmarks: ['PMA', 'Kias', 'Fort Del Pilar'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.3700, 120.6200],
      endCoords: [16.3850, 120.6150]
    },
    { 
      code: 'R-11', 
      name: 'Kadaclan – Happy Hallow', 
      from: 'Kadaclan', 
      to: 'Happy Hallow', 
      fare: 12, 
      schedule: '5:00 AM – 7:00 PM', 
      stops: 'Kadaclan → Happy Hallow',
      fullRoute: 'Kadaclan → Happy Hallow',
      landmarks: ['Kadaclan', 'Happy Hallow', 'Baguio Country Club'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4100, 120.6100],
      endCoords: [16.4000, 120.6200]
    },
    { 
      code: 'R-12', 
      name: 'Kennon Line', 
      from: 'Baguio City', 
      to: 'Kennon Road', 
      fare: 20, 
      schedule: '5:30 AM – 6:30 PM', 
      stops: 'Baguio → Kennon Road viewpoints',
      fullRoute: 'Baguio City → Kennon Road → Camp 6 → Camp 1',
      landmarks: ['Kennon Road', 'Bridal Veil Falls', 'Camp 1-8'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4030, 120.5970],
      endCoords: [16.3000, 120.5500]
    },
    { 
      code: 'R-13', 
      name: 'Bakakeng Line', 
      from: 'Bakakeng', 
      to: 'City Center', 
      fare: 12, 
      schedule: '5:00 AM – 8:00 PM', 
      stops: 'Bakakeng → City Market',
      fullRoute: 'Bakakeng Norte/Sur → City Center',
      landmarks: ['Bakakeng', 'City Market', 'Igorot Garden'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.3850, 120.5800],
      endCoords: [16.4030, 120.5970]
    },
    { 
      code: 'R-14', 
      name: 'Crystal Cave Line', 
      from: 'Crystal Cave', 
      to: 'City Center', 
      fare: 15, 
      schedule: '5:30 AM – 7:30 PM', 
      stops: 'Crystal Cave → City Market',
      fullRoute: 'Crystal Cave → City Center',
      landmarks: ['Crystal Cave', 'City Market'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.3950, 120.5750],
      endCoords: [16.4030, 120.5970]
    },
    { 
      code: 'R-15', 
      name: 'Dontogan – Sto. Tomas', 
      from: 'Dontogan', 
      to: 'Sto. Tomas', 
      fare: 15, 
      schedule: '6:00 AM – 6:00 PM', 
      stops: 'Dontogan → Sto. Tomas',
      fullRoute: 'Dontogan → Sto. Tomas',
      landmarks: ['Dontogan', 'Sto. Tomas', 'Mount Sto. Tomas'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4200, 120.6000],
      endCoords: [16.4400, 120.5900]
    },
    { 
      code: 'R-16', 
      name: 'Palispis – Bengao – Sto. Nino – Kitma', 
      from: 'Palispis', 
      to: 'Kitma', 
      fare: 13, 
      schedule: '5:30 AM – 7:00 PM', 
      stops: 'Palispis → Bengao → Sto. Nino → Kitma',
      fullRoute: 'Palispis Highway → Bengao → Sto. Nino → Kitma',
      landmarks: ['Palispis Highway', 'Bengao', 'Sto. Nino', 'Kitma'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4250, 120.5850],
      endCoords: [16.4150, 120.5900]
    },
    { 
      code: 'R-17', 
      name: 'Guisad Valley Line', 
      from: 'Guisad', 
      to: 'City Center', 
      fare: 12, 
      schedule: '5:00 AM – 8:00 PM', 
      stops: 'Guisad → City Market',
      fullRoute: 'Guisad Valley → City Center',
      landmarks: ['Guisad', 'City Market', 'Saint Louis University'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4250, 120.6100],
      endCoords: [16.4030, 120.5970]
    },
    { 
      code: 'R-18', 
      name: 'Fairview Line', 
      from: 'Fairview', 
      to: 'City Center', 
      fare: 12, 
      schedule: '5:00 AM – 8:00 PM', 
      stops: 'Fairview → City Market',
      fullRoute: 'Fairview → City Center',
      landmarks: ['Fairview', 'Baguio City Market'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4350, 120.6050],
      endCoords: [16.4030, 120.5970]
    },
    { 
      code: 'R-19', 
      name: 'Pinsao Pilot Line', 
      from: 'Pinsao', 
      to: 'City Center', 
      fare: 12, 
      schedule: '5:00 AM – 7:30 PM', 
      stops: 'Pinsao → City Market',
      fullRoute: 'Pinsao Pilot → City Center',
      landmarks: ['Pinsao', 'City Market'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4300, 120.5950],
      endCoords: [16.4030, 120.5970]
    },
    { 
      code: 'R-20', 
      name: 'Asin – San Luis Line', 
      from: 'Asin', 
      to: 'San Luis', 
      fare: 20, 
      schedule: '5:30 AM – 6:30 PM', 
      stops: 'Asin → San Luis',
      fullRoute: 'Asin Road → San Luis',
      landmarks: ['Asin Hot Springs', 'San Luis', 'Asin Road'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.3500, 120.5700],
      endCoords: [16.3700, 120.5800]
    },
    { 
      code: 'R-21', 
      name: 'Lourdes Dominican Line', 
      from: 'Lourdes', 
      to: 'Dominican', 
      fare: 12, 
      schedule: '5:00 AM – 7:00 PM', 
      stops: 'Lourdes → Dominican',
      fullRoute: 'Lourdes Grotto → Dominican Hill',
      landmarks: ['Lourdes Grotto', 'Dominican Hill', 'Mirador Eco Park'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4000, 120.6100],
      endCoords: [16.4050, 120.6050]
    },
    { 
      code: 'R-22', 
      name: 'Quezon Hill Line', 
      from: 'Quezon Hill', 
      to: 'City Center', 
      fare: 12, 
      schedule: '5:00 AM – 8:00 PM', 
      stops: 'Quezon Hill → City Market',
      fullRoute: 'Quezon Hill → City Center',
      landmarks: ['Quezon Hill', 'Tam-awan Village', 'City Market'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4300, 120.6000],
      endCoords: [16.4030, 120.5970]
    },
    { 
      code: 'R-23', 
      name: 'San Carlos Heights Line', 
      from: 'San Carlos Heights', 
      to: 'City Center', 
      fare: 12, 
      schedule: '5:30 AM – 7:30 PM', 
      stops: 'San Carlos → City Market',
      fullRoute: 'San Carlos Heights → City Center',
      landmarks: ['San Carlos Heights', 'City Market'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4400, 120.5900],
      endCoords: [16.4030, 120.5970]
    },
    { 
      code: 'R-24', 
      name: 'Irisan – Quirino Highway Line 1', 
      from: 'Irisan', 
      to: 'Quirino Highway', 
      fare: 14, 
      schedule: '5:00 AM – 8:00 PM', 
      stops: 'Irisan → Quirino Highway',
      fullRoute: 'Irisan → Quirino Highway',
      landmarks: ['Irisan', 'Quirino Highway', 'PHISCI'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4300, 120.5850],
      endCoords: [16.4200, 120.5900]
    },
    { 
      code: 'R-25', 
      name: 'Quirino Hill Line', 
      from: 'Quirino Hill', 
      to: 'City Center', 
      fare: 12, 
      schedule: '5:00 AM – 8:00 PM', 
      stops: 'Quirino Hill → City Market',
      fullRoute: 'Quirino Hill → City Center',
      landmarks: ['Quirino Hill', 'Baguio City Market'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4250, 120.5950],
      endCoords: [16.4030, 120.5970]
    },
    { 
      code: 'R-26', 
      name: 'Pinget Line', 
      from: 'Pinget', 
      to: 'City Center', 
      fare: 12, 
      schedule: '5:00 AM – 7:30 PM', 
      stops: 'Pinget → City Market',
      fullRoute: 'Pinget → City Center',
      landmarks: ['Pinget', 'Baguio City Market'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4350, 120.5900],
      endCoords: [16.4030, 120.5970]
    },
    { 
      code: 'R-27', 
      name: 'Aurora Hill District Line', 
      from: 'Aurora Hill', 
      to: 'City Center', 
      fare: 12, 
      schedule: '5:00 AM – 9:00 PM', 
      stops: 'Aurora Hill → City Market',
      fullRoute: 'Aurora Hill → City Center',
      landmarks: ['Aurora Hill', 'Baguio City Market', 'Saint Louis University'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4150, 120.6100],
      endCoords: [16.4030, 120.5970]
    },
    { 
      code: 'R-28', 
      name: 'Trancoville District Line', 
      from: 'Trancoville', 
      to: 'City Center', 
      fare: 12, 
      schedule: '5:00 AM – 9:00 PM', 
      stops: 'Trancoville → City Market',
      fullRoute: 'Trancoville → City Center',
      landmarks: ['Trancoville', 'Saint Louis University', 'Baguio City Market'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4200, 120.6050],
      endCoords: [16.4030, 120.5970]
    },
    { 
      code: 'R-29', 
      name: 'Honeymoon – Holy Ghost – Brookside', 
      from: 'Honeymoon', 
      to: 'Brookside', 
      fare: 12, 
      schedule: '5:30 AM – 7:30 PM', 
      stops: 'Honeymoon → Holy Ghost → Brookside',
      fullRoute: 'Honeymoon Drive → Holy Ghost → Brookside',
      landmarks: ['Honeymoon Drive', 'Holy Ghost', 'Brookside'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4100, 120.6100],
      endCoords: [16.4200, 120.6150]
    },
    { 
      code: 'R-30', 
      name: 'Circumferential Line', 
      from: 'Quirino Highway', 
      to: 'Loakan Road', 
      fare: 15, 
      schedule: '6:00 AM – 6:00 PM', 
      stops: 'Quirino Hwy → Asin Rd → Palispis Hwy → Kennon Rd → Loakan Rd',
      fullRoute: 'Circle around Baguio City via major highways',
      landmarks: ['PHISCI', 'Asin Road', 'Palispis Highway', 'Kennon Road', 'Loakan Road'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4250, 120.5900],
      endCoords: [16.3700, 120.6100]
    },

    
    { 
      code: 'J-11', 
      name: 'Lourdes Subdivision – Lourdes Grotto', 
      from: 'Lourdes Subdivision', 
      to: 'Lourdes Grotto', 
      fare: 12,
      schedule: '5:30 AM – 7:00 PM',
      stops: 'Lourdes Gate → 7-Eleven → Lourdes Elementary → Grotto',
      fullRoute: 'Lourdes Subdivision Gate → 7-Eleven Lourdes → Lourdes Elementary School → Lourdes Grotto',
      landmarks: ['7-Eleven Lourdes', 'Lourdes Elementary School', 'Lourdes Grotto'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4050, 120.6120],
      endCoords: [16.4000, 120.6100]
    },
    { 
      code: 'J-12', 
      name: 'Green Valley – Pacdal Circle', 
      from: 'Green Valley', 
      to: 'Pacdal Circle', 
      fare: 13,
      schedule: '5:30 AM – 8:30 PM',
      stops: 'Green Valley → Pacdal Elementary → Wright Park → The Mansion → Pacdal Circle',
      fullRoute: 'Green Valley Gate → Pacdal Elementary School → Wright Park → The Mansion → Pacdal Circle',
      landmarks: ['Pacdal Elementary School', 'Wright Park', 'The Mansion', 'Pacdal Circle'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.3950, 120.6080],
      endCoords: [16.3880, 120.6080]
    },
    { 
      code: 'J-13', 
      name: 'Camp John Hay – Scout Barrio', 
      from: 'Camp John Hay', 
      to: 'Scout Barrio', 
      fare: 13,
      schedule: '6:00 AM – 7:00 PM',
      stops: 'Camp John Hay Gate → The Manor → Scout Barrio',
      fullRoute: 'Camp John Hay Gate → The Manor → Scout Barrio',
      landmarks: ['Camp John Hay Gate', 'The Manor', 'Scout Barrio'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.3980, 120.6050],
      endCoords: [16.4080, 120.5950]
    },
    { 
      code: 'J-14', 
      name: 'BGH – Campo Sioco', 
      from: 'BGH', 
      to: 'Campo Sioco', 
      fare: 12,
      schedule: '5:30 AM – 7:30 PM',
      stops: 'Baguio General Hospital → Engineers Hill → Campo Sioco',
      fullRoute: 'Baguio General Hospital → Engineers Hill → Campo Sioco',
      landmarks: ['Baguio General Hospital', 'Engineers Hill', 'Campo Sioco'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4050, 120.6000],
      endCoords: [16.4200, 120.5950]
    },
    { 
      code: 'J-15', 
      name: 'PMA – Kias', 
      from: 'PMA', 
      to: 'Kias', 
      fare: 16,
      schedule: '5:30 AM – 7:00 PM',
      stops: 'Philippine Military Academy → Fort Del Pilar → Kias',
      fullRoute: 'Philippine Military Academy → Fort Del Pilar → Kias',
      landmarks: ['Philippine Military Academy', 'Fort Del Pilar', 'Kias'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.3700, 120.6200],
      endCoords: [16.3850, 120.6150]
    },
    { 
      code: 'J-16', 
      name: 'Bakakeng – City Center', 
      from: 'Bakakeng', 
      to: 'Session Road', 
      fare: 13,
      schedule: '5:30 AM – 7:30 PM',
      stops: 'Bakakeng Norte → Bakakeng Elementary → Igorot Garden → Baguio Country Club → Session Road',
      fullRoute: 'Bakakeng Norte → Bakakeng Elementary School → Igorot Garden → Baguio Country Club → Session Road',
      landmarks: ['Bakakeng Elementary School', 'Igorot Garden', 'Baguio Country Club'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.3850, 120.5800],
      endCoords: [16.4045, 120.5965]
    },
    { 
      code: 'J-17', 
      name: 'Pinsao Pilot – City Market', 
      from: 'Pinsao Pilot', 
      to: 'Baguio City Market', 
      fare: 12,
      schedule: '5:00 AM – 7:30 PM',
      stops: 'Pinsao Pilot → BSU Baguio Campus → Dangwa Terminal → Baguio City Market',
      fullRoute: 'Pinsao Pilot → BSU Baguio Campus → Dangwa Terminal → Baguio City Market',
      landmarks: ['BSU Baguio Campus', 'Dangwa Terminal', 'Baguio City Market'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4350, 120.5950],
      endCoords: [16.4080, 120.5980]
    },
    { 
      code: 'J-18', 
      name: 'Irisan – City Center', 
      from: 'Irisan', 
      to: 'Session Road', 
      fare: 14,
      schedule: '5:00 AM – 8:00 PM',
      stops: 'Irisan → PHISCI → Dangwa Terminal → Baguio City Market → Session Road',
      fullRoute: 'Irisan → PHISCI → Dangwa Terminal → Baguio City Market → Session Road',
      landmarks: ['PHISCI', 'Dangwa Terminal', 'Baguio City Market'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4300, 120.5850],
      endCoords: [16.4050, 120.5965]
    },
    { 
      code: 'J-19', 
      name: 'Quirino Hill – City Market', 
      from: 'Quirino Hill', 
      to: 'Baguio City Market', 
      fare: 12,
      schedule: '5:00 AM – 7:00 PM',
      stops: 'Quirino Hill → Tam-awan Village → Kayang Street → Baguio City Market',
      fullRoute: 'Quirino Hill → Tam-awan Village → Kayang Street → Baguio City Market',
      landmarks: ['Tam-awan Village', 'Kayang Street', 'Baguio City Market'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4250, 120.5950],
      endCoords: [16.4080, 120.5980]
    },
    { 
      code: 'J-20', 
      name: 'Pinget – City Center', 
      from: 'Pinget', 
      to: 'Session Road', 
      fare: 12,
      schedule: '5:00 AM – 7:30 PM',
      stops: 'Pinget → Pinget Elementary School → Dangwa Terminal → Session Road',
      fullRoute: 'Pinget → Pinget Elementary School → Dangwa Terminal → Session Road',
      landmarks: ['Pinget Elementary School', 'Dangwa Terminal', 'Session Road'],
      type: 'jeepney',
      hasMap: true,
      startCoords: [16.4350, 120.5900],
      endCoords: [16.4030, 120.5970]
    },
    { 
      code: 'T-1', 
      name: 'City Taxi', 
      from: 'Anywhere', 
      to: 'Anywhere', 
      fare: 40, 
      schedule: '24 hours', 
      stops: 'Available citywide',
      fullRoute: 'Point to point anywhere in Baguio City',
      landmarks: ['Citywide Service'],
      type: 'taxi',
      hasMap: false,
      startCoords: null,
      endCoords: null
    }
  ];
  
  get filteredRoutes() {
    if (this.selectedFilter === 'All Routes') return this.routes;
    return this.routes.filter(r => r.type === this.selectedFilter.toLowerCase());
  }
  
  showRouteOnMap(route: any) {
    this.selectedRoute = route;
    this.showMap = true;
    
    setTimeout(() => {
      this.initMap(route);
    }, 100);
  }
  
  initMap(route: any) {
    const mapElement = document.getElementById('route-map');
    if (!mapElement) return;
    
    if (typeof L === 'undefined') {
      this.loadLeafletAndInit(route);
      return;
    }
    
    this.createMap(route);
  }
  
  loadLeafletAndInit(route: any) {
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
    
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      this.loadRoutingMachine(route);
    };
    document.body.appendChild(script);
  }
  
  loadRoutingMachine(route: any) {
    const routingScript = document.createElement('script');
    routingScript.src = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js';
    routingScript.onload = () => {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css';
      document.head.appendChild(cssLink);
      this.createMap(route);
    };
    document.body.appendChild(routingScript);
  }
  
  createMap(route: any) {
    if (this.mapInstance) {
      this.mapInstance.remove();
    }
    
    if (this.routingControl) {
      this.mapInstance?.removeControl(this.routingControl);
    }
    
    const center: [number, number] = [16.4023, 120.5960];
    this.mapInstance = L.map('route-map').setView(center, 13);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors',
      subdomains: 'abcd',
      maxZoom: 19,
      minZoom: 10
    }).addTo(this.mapInstance);
    
    if (route.startCoords && route.endCoords && typeof L.Routing !== 'undefined') {
      this.routingControl = L.Routing.control({
        waypoints: [
          L.latLng(route.startCoords[0], route.startCoords[1]),
          L.latLng(route.endCoords[0], route.endCoords[1])
        ],
        routeWhileDragging: false,
        showAlternatives: false,
        lineOptions: {
          styles: [{ color: '#D4622A', weight: 5, opacity: 0.8 }]
        },
        createMarker: (i: number, waypoint: any, n: number) => {
          const icon = i === 0 ? '🚩' : '🏁';
          return L.marker(waypoint.latLng, {
            icon: L.divIcon({
              html: `<div style="font-size: 24px;">${icon}</div>`,
              iconSize: [24, 24],
              className: 'custom-marker'
            })
          }).bindPopup(i === 0 ? `<strong>🚩 Start: ${route.from}</strong>` : `<strong>🏁 End: ${route.to}</strong>`);
        },
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        show: true
      }).addTo(this.mapInstance);
    }
  }
  
  closeMap() {
    this.showMap = false;
    this.selectedRoute = null;
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
    }
    this.routingControl = null;
  }
}
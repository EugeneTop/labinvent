import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getWifi} from './action/getWifi'; 
import refresh from './refresh_icon.svg';
import {postEthernet, getEthernet} from './action/ethernet';
import {postWifi, getWf} from './action/wifi';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disabledIp: 'disabled',
      colorIp: 'silver',
      disabledDNS: 'disabled',
      colorDNS: 'silver',
      disabledWF: 'disabled',
      colorWFIP: 'silver',
      disabledWFIP: 'disabled',
      colorWF: 'silver',
      disabledWFDNS: 'disabled',
      colorWFDNS: 'silver',
      checkedIp1: 'checked',
      checkedIp2: '',
      checkedIpWF1: 'checked',
      checkedIpWF2: '',
      checkedDNS1: 'checked',
      checkedDNS2: '',
      isChecked: false,
      isCheckedS: false,
      disabledSecurity: 'disabled',
      colorSecurity: 'silver',
      checkedIpWFDNS1: 'checked',
      checkedIpWFDNS2: '',
      wifiName: 'Please select',
      valueWifi: '', 
      ipwf: '',
      maskwf: '',
      gatewaywf: '',
      prefDNSWF: '',
      altDNSWF: '',
      ip: '',
      mask: '',
      gateway: '',
      prefDNS: '',
      altDNS: '',
      securityKey: '',
    };
  }

  componentWillMount(){
    this.props.onGetWifi();
    if(localStorage.getItem('TokenWF')){
      let token = localStorage.getItem('TokenWF');
      this.props.onGetWf(token);
      this.props.onGetEthernet(token);
      
      setTimeout(() => {
        this.props.ethernet.map((eth) => {
          if(eth.ipAdress === true){
            this.setState({
              disabledIp: '',
              colorIp: 'black',
              checkedIp1: '',
              checkedIp2: 'checked',
              ip: eth.ip,
              mask: eth.mask,
              gateway: eth.gateway
            });
          }
          if(eth.adressDNS === true){
            this.setState({
              disabledDNS: '',
              colorDNS: 'black',
              checkedDNS1: '',
              checkedDNS2: 'checked',
              prefDNS: eth.prefDNS,
              altDNS: eth.altDNS
            });
          }
          return 0;
        })
        this.props.wifis.map((wifi) => {
          if(wifi.wifiName.length !== 0){
            this.setState({
              isChecked: true,
              disabledWF: '',
              colorWF: 'black',
              wifiName: wifi.wifiName,
              valueWifi: wifi.wifiName
             });
          }
          if(wifi.securityKey.length !== 0){
            this.setState({
              isCheckedS: true,
              disabledSecurity: '',
              colorSecurity: 'black',
              securityKey: wifi.securityKey
             });
          }
          if(wifi.ipAdress === true){
            this.setState({
              disabledWFIP: '',
              colorWFIP: 'black',
              checkedIpWF1: '',
              checkedIpWF2: 'checked',
              ipwf: wifi.ip,
              maskwf: wifi.mask,
              gatewaywf: wifi.gateway
            });
          }
          if(wifi.adressDNS === true){
            this.setState({
              disabledWFDNS: '',
              colorWFDNS: 'black',
              checkedIpWFDNS1: '',
              checkedIpWFDNS2: 'checked',
              prefDNSWF: wifi.prefDNS,
              altDNSWF: wifi.altDNS,
            });
          }
          return 0;
        })
      }, 1500);
    }
  }

  _IP1(){
    this.setState({
      disabledIp: '',
      colorIp: 'black',
      checkedIp1: '',
      checkedIp2: 'checked'
    });
  }

  _IP2(){
    this.setState({
      disabledIp: 'disabled',
      colorIp: 'silver',
      checkedIp1: 'checked',
      checkedIp2: ''
    });
  }

  _IPWF1(){
    this.setState({
      disabledWFIP: 'disabled',
      colorWFIP: 'silver',
      checkedIpWF1: 'checked',
      checkedIpWF2: ''
    });
  }

  _IPWF2(){
    this.setState({
      disabledWFIP: '',
      colorWFIP: 'black',
      checkedIpWF1: '',
      checkedIpWF2: 'checked'
    });
  }

  _IPWFDNS1(){
    this.setState({
      disabledWFDNS: 'disabled',
      colorWFDNS: 'silver',
      checkedIpWFDNS1: 'checked',
      checkedIpWFDNS2: ''
    });
  }

  _IPWFDNS2(){
    this.setState({
      disabledWFDNS: '',
      colorWFDNS: 'black',
      checkedIpWFDNS1: '',
      checkedIpWFDNS2: 'checked'
    });
  }

  _DNS1(){
    this.setState({
      disabledDNS: '',
      colorDNS: 'black',
      checkedDNS1: '',
      checkedDNS2: 'checked'
    });
  }

  _DNS2(){
    this.setState({
      disabledDNS: 'disabled',
      colorDNS: 'silver',
      checkedDNS1: 'checked',
      checkedDNS2: ''
    });
  }

  _wifi(){
   if(this.state.isChecked === false){
     this.setState({
       isChecked: true,
       disabledWF: '',
       colorWF: 'black'
      });
   }else{
    this.setState({
      isChecked: false,
      disabledWF: 'disabled',
      colorWF: 'silver'
     });
   } 
  }

  _security(){
    if(this.state.isCheckedS === false){
      this.setState({
        isCheckedS: true,
        disabledSecurity: '',
        colorSecurity: 'black'
       });
    }else{
     this.setState({
       isCheckedS: false,
       disabledSecurity: 'disabled',
       colorSecurity: 'silver'
      });
    } 
   }

  _ip(e){
    this.setState({ip: e.target.value});
  }

  _mask(e){
    this.setState({mask: e.target.value});
  }

  _gateway(e){
    this.setState({gateway: e.target.value});
  }

  _prefDNS(e){
    this.setState({prefDNS: e.target.value});
  }

  _altDNS(e){
    this.setState({altDNS: e.target.value});
  }

  _ipwf(e){
    this.setState({ipwf: e.target.value});
  }

  _maskwf(e){
    this.setState({maskwf: e.target.value});
  }

  _gatewaywf(e){
    this.setState({gatewaywf: e.target.value});
  }

  _prefDNSWF(e){
    this.setState({prefDNSWF: e.target.value});
  }

  _altDNSWF(e){
    this.setState({altDNSWF: e.target.value});
  }

  _securityKey(e){
    this.setState({securityKey: e.target.value});
  }

   _wf(){
    this.props.onGetWifi();
    this.refs.option.value=this.state.valueWifi;
   }

   _save(){
    let ip = this.refs.ip.value;
    let mask = this.refs.mask.value;
    let gateway = this.refs.gateway.value;
    let PrefDNS = this.refs.PrefDNS.value;
    let AltDNS = this.refs.AltDNS.value;
    if(this.state.checkedIp1 !== "checked"){
      if(ip.length === 0 || mask.length === 0){
        return alert("Error in IP adress or Subnet Mask");
      }
    }
    if(this.state.checkedDNS1 !== "checked" && PrefDNS.length === 0){
      return alert("Error in Preferred DNS server");
    }
    this.props.onEthernet(ip, mask, gateway, PrefDNS, AltDNS);
    setTimeout(() => {
      let name = this.refs.option.value;
      let securityKey = this.refs.securityKey.value;
      let token = this.props.ethernet;
      let ipWF = this.refs.ipWF.value;
      let maskWF = this.refs.maskWF.value;
      let gatewayWF = this.refs.gatewayWF.value;
      let PrefDNSWF = this.refs.prefDNSWF.value;
      let AltDNSWF = this.refs.altDNSWF.value;
      if(this.state.isChecked === true && name.length === 0){
        return alert("Error in Wireless Network Name on wifi");
      }
      if(this.state.isChecked === true){
        if(this.state.isCheckeds === true && securityKey.length === 0){
          return alert("Error in Security Key on wifi");
        }
      }
      if(this.state.isChecked === true){
        if(this.state.checkedIpWF1 !== 'checked'){
          if(ipWF.length === 0 || maskWF.length === 0){
            return alert("Error in IP adress or Subnet Mask on wifi");
          }
        }
      }
      if(this.state.isChecked === true){
        if(this.state.checkedIpWFDNS1 !== 'checked'){
          if(PrefDNSWF.length === 0){
            return alert("Error in Preferred DNS server on wifi");
          }
        }
      }
      this.props.onWifi(name, securityKey, ipWF, maskWF, gatewayWF, PrefDNSWF, AltDNSWF, token);
      localStorage.setItem('TokenWF', this.props.ethernet);
      document.location.reload();
    }, 1000);
   }

  _reset(){
    document.location.reload();
  }

  render() {
    return (
      <div className="App row">
        <div className="col-md-6 first-half">
          <p><b>Ethernet Settings</b></p>
          <input type="radio" className="radio" id="radio" name="IP" onClick={this._IP2.bind(this)} checked={this.state.checkedIp1}/>
          <label htmlFor="radio" className="textRadio">Obtain an IP adress automatically(DHCP/BootP)</label><br/>
          <input type="radio" className="radio" id="radios" name="IP" onClick={this._IP1.bind(this)} checked={this.state.checkedIp2}/>
          <label htmlFor="radios" className="textRadio">Use the following IP adress:</label>
          <div className="offset-md-1 row">
            <span className="col-md-5 text-right textForIp" style={{color: this.state.colorIp}}>IP adress:<span className="textIp">*</span></span>
            <input type="text" className="col-md-6 inpIP" disabled={this.state.disabledIp} value={this.state.ip} onChange={this._ip.bind(this)} ref='ip'/>
            <span className="col-md-5 text-right textForIp" style={{color: this.state.colorIp}}>Subnet Mask:<span className="textIp">*</span></span>
            <input type="text" className="col-md-6 inpIP" disabled={this.state.disabledIp} value={this.state.mask} onChange={this._mask.bind(this)} ref='mask'/>
            <span className="col-md-5 text-right textForIp" style={{color: this.state.colorIp}}>Default Gateway:</span>
            <input type="text" className="col-md-6 inpIP" disabled={this.state.disabledIp} value={this.state.gateway} onChange={this._gateway.bind(this)} ref='gateway'/>
          </div>
          <input type="radio" className="radio" id="radioDNS" name="DNS" onClick={this._DNS2.bind(this)} checked={this.state.checkedDNS1}/>
          <label htmlFor="radioDNS" className="textRadio">Obtain an DNS server adress automatically</label><br/>
          <input type="radio" className="radio" id="radiosDNS" name="DNS" onClick={this._DNS1.bind(this)} checked={this.state.checkedDNS2}/>
          <label htmlFor="radiosDNS" className="textRadio">Use the following DS adress:</label>
          <div className="offset-md-1 row">
            <span className="col-md-5 text-right textForIp" style={{color: this.state.colorDNS}}>Preferred DNS server:<span className="textIp">*</span></span>
            <input type="text" className="col-md-6 inpIP" disabled={this.state.disabledDNS}  ref='PrefDNS' value={this.state.prefDNS} onChange={this._prefDNS.bind(this)}/>
            <span className="col-md-5 text-right textForIp" style={{color: this.state.colorDNS}}>Alternative DNS server:</span>
            <input type="text" className="col-md-6 inpIP" disabled={this.state.disabledDNS} ref='AltDNS' value={this.state.altDNS} onChange={this._altDNS.bind(this)}/>
          </div>
        </div>
        <div className="col-md-6 second-half">
          <p><b>Wireless Settings</b></p>
          <label className="container"><span style={{fontSize: '16px', position: 'absolute'}}>Enable wifi</span>
            <input type="checkbox" onChange={this._wifi.bind(this)} checked={this.state.isChecked}/>
            <span className="checkmark"></span>
          </label><br/>
          <div className="offset-md-1 row" style={{marginTop: '10px', marginBottom: '10px'}}>
            <span className="col-md-5 text-right textForIp" style={{color: this.state.colorWF}}>Wireless Network Name<span className="textIp">*</span></span>
            <select className="col-md-6" style={{color: 'silver'}} ref='option' disabled={this.state.disabledWF}>
              <option value={this.state.valueWifi} hidden disabled selected>{this.state.wifiName}</option>
              {this.props.wifi.map((wifi, id) => {
                return <option value={wifi.ssid} key={id}>{wifi.ssid}</option>
              })}
            </select>
            <img src={refresh} alt={refresh} style={{cursor:'pointer'}} onClick={this._wf.bind(this)}/>
          </div>
          <label className="container"><span style={{fontSize: '16px', position: 'absolute', color: this.state.colorWF}}>Enable Wireless Security:</span>
            <input type="checkbox" disabled={this.state.disabledWF} onChange={this._security.bind(this)} checked={this.state.isCheckedS}/>
            <span className="checkmark"></span>
          </label><br/>
          <div className="offset-md-1 row">
            <span className="col-md-5 text-right textForIp" style={{color: this.state.colorSecurity}}>Security Key:<span className="textIp">*</span></span>
            <input type="text" className="col-md-6 inpIP" disabled={this.state.disabledSecurity} value={this.state.securityKey} onChange={this._securityKey.bind(this)} ref='securityKey'/>
          </div>
          <div style={{marginTop: '10px'}}>
            <input type="radio" className="radio" id="radioWF" name="IPWF" disabled={this.state.disabledWF} onClick={this._IPWF1.bind(this)} checked={this.state.checkedIpWF1}/>
            <label htmlFor="radioWF" className="textRadio" style={{color: this.state.colorWF}}>Obtain an IP adress automatically(DHCP/BootP)</label><br/>
            <input type="radio" className="radio" id="radiosWF" disabled={this.state.disabledWF} name="IPWF" onClick={this._IPWF2.bind(this)} checked={this.state.checkedIpWF2}/>
            <label htmlFor="radiosWF" className="textRadio" style={{color: this.state.colorWF}}>Use the following IP adress:</label>
            <div className="offset-md-1 row">
              <span className="col-md-5 text-right textForIp" style={{color: this.state.colorWFIP}}>IP adress:<span className="textIp">*</span></span>
              <input type="text" className="col-md-6 inpIP" disabled={this.state.disabledWFIP} value={this.state.ipwf} onChange={this._ipwf.bind(this)} ref='ipWF'/>
              <span className="col-md-5 text-right textForIp" style={{color: this.state.colorWFIP}} >Subnet Mask:<span className="textIp">*</span></span>
              <input type="text" className="col-md-6 inpIP" disabled={this.state.disabledWFIP} value={this.state.maskwf} ref='maskWF' onChange={this._maskwf.bind(this)}/>
              <span className="col-md-5 text-right textForIp" style={{color: this.state.colorWFIP}}>Default Gateway:</span>
              <input type="text" className="col-md-6 inpIP" disabled={this.state.disabledWFIP} value={this.state.gatewaywf} onChange={this._gatewaywf.bind(this)} ref='gatewayWF'/>
            </div>
          </div>
          <input type="radio" className="radio" id="radioDNSWF" name="DNSWF" disabled={this.state.disabledWF} onClick={this._IPWFDNS1.bind(this)} checked={this.state.checkedIpWFDNS1}/>
          <label htmlFor="radioDNSWF" className="textRadio" style={{color: this.state.colorWF}}>Obtain an DNS server adress automatically</label><br/>
          <input type="radio" className="radio" id="radiosDNSWF" name="DNSWF" disabled={this.state.disabledWF} onClick={this._IPWFDNS2.bind(this)} checked={this.state.checkedIpWFDNS2}/>
          <label htmlFor="radiosDNSWF" className="textRadio" style={{color: this.state.colorWF}}>Use the following DS adress:</label>
          <div className="offset-md-1 row">
            <span className="col-md-5 text-right textForIp" style={{color: this.state.colorWFDNS}}>Preferred DNS server:<span className="textIp">*</span></span>
            <input type="text" className="col-md-6 inpIP" disabled={this.state.disabledWFDNS} ref='prefDNSWF' value={this.state.prefDNSWF} onChange={this._prefDNSWF.bind(this)}/>
            <span className="col-md-5 text-right textForIp" style={{color: this.state.colorWFDNS}}>Alternative DNS server:</span>
            <input type="text" className="col-md-6 inpIP" disabled={this.state.disabledWFDNS} value={this.state.altDNSWF} ref='altDNSWF' onChange={this._altDNSWF.bind(this)}/>
          </div>
        </div>
        <div className="col-md-12 bott">
          <button className="btn btn-info butt" onClick={this._save.bind(this)}>Save</button>
          <button onClick={this._reset.bind(this)} className="btn btn-default butt" style={{borderColor: '#2196F3', backgroundColor: 'white', color: '#2196F3'}}>Cancle</button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    wifi: state.getWifi,
    ethernet: state.ethernet,
    wifis: state.wifi,
  }),
  dispatch => ({
    onGetWifi:() => {
      dispatch(getWifi())
    },
    onEthernet:(ip, mask, gateway, prefDNS, altDNS) => {
      dispatch(postEthernet(ip, mask, gateway, prefDNS, altDNS))
    },
    onWifi:(name, securityKey, ip, mask, gateway, prefDNS, altDNS, token) => {
      dispatch(postWifi(name, securityKey, ip, mask, gateway, prefDNS, altDNS, token))
    },
    onGetWf:(token) => {
      dispatch(getWf(token));
    },
    onGetEthernet:(token) => {
      dispatch(getEthernet(token));
    }
  })
)(App);

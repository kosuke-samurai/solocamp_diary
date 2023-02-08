import React from 'react'
import { Spinner } from './Spinner';
import { FC, useState, memo, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { Loader } from '@googlemaps/js-api-loader';
import useStore from '@/Store';
import { useQuerySites } from "@/hooks/useQuerySites";
import GoogleMapReact from "google-map-react";

import { useRef } from 'react';
import { useCallback } from 'react';


const libraries: any[] = ["places"];

type SiteExample = {
  hitokoto: string | undefined;
  id: string | undefined;
  lat: number;
  lng: number;
  title: string | undefined;
}  



export const MapItem = () => {

 const [isMapopen, SetIsMapopen] = useState(false)

  const session = useStore((state) => state.session)

  
  const { data: sites } = useQuerySites();
  // console.log(sites);
  const [siteArrays, setSiteArrays] = React.useState<any[]>([]);
  const newSiteArrays: Array<any> = new Array();
  



  const geocode = () => {
    
      sites?.map((site) => {
        const place = site.adress;

        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        });

//実行タイミング苦戦したらこの書き方！(①asyncを付ける)★★★
        loader.load().then(async() => {
          const geocoder = new google.maps.Geocoder();
          //（②API処理部＝非同期処理にawaitをつける。③await内部にsetState
          await geocoder.geocode({ address: place }, (results, status) => {
        
            if (status === 'OK' && results![0].geometry?.location !== undefined) {
              newSiteArrays.push({
                id: site.id,
                title: site.title,
                hitokoto: site.hitokoto,
                lat: results![0].geometry.location.lat(),
                lng: results![0].geometry.location.lng(),
              });
            }
          setSiteArrays([...siteArrays, newSiteArrays])
          });
          
        })
        //↑実行タイミング苦戦したらこの書き方！★★★↑
      })
      
    
    // setSiteArrays([...siteArrays, newSiteArrays])
    SetIsMapopen(true);
  }

console.log(siteArrays)





// map系表示
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map:any) => {
    mapRef.current = map;
  }, []);

  const containerStyle = {
  width: "100%",
  height: "80%",
  };


  const [selected, setSelected] = useState<SiteExample>({
  hitokoto: '',
  id: '',
  lat: 0,
  lng: 0,
  title: '',
});


if (loadError) throw new Error;
if (!isLoaded) { return (<><p>Loading...</p></>) };
  
return (
    <>
      {!isMapopen ? (
      <div>
         <button onClick={geocode}>押す</button> 
    </div>) :
       
        
      siteArrays.length && typeof window !== "undefined" ?
      <GoogleMap
        id="map"
        mapContainerStyle={containerStyle}
        zoom={8}
        center={{
          lat: 33.5902,
          lng: 130.3976,
        }}
        onLoad={onMapLoad}
          >

            {siteArrays[0].map((site: any) => {
              console.log(site.lat);
              return (
                <>
                <Marker
                  key={`${site.length}`}
                  position={{
                    lat: site.lat,
                    lng: site.lng,
                  }}
                    onClick={() => {
                      setSelected({
                        ...selected,
                        hitokoto: site.hitokoto,
                        id: site.id,
                        lat: site.lat,
                        lng: site.lng,
                        title: site.title
                        });
                  }}
                  />
                </>
              )
            })} 
{console.log(selected)}
        {selected.hitokoto &&
              <InfoWindow
          key={selected.id}
          position={{
            lat: selected.lat,
            lng: selected.lng,
          }}
 
          onCloseClick={() => {
            setSelected({
              hitokoto: '',
              id: '',
              lat: 0,
              lng: 0,
              title: '',
            });
          }}
              >
                <ul>
                <li>{selected.title}</li>
                <li>ポイント：{selected.hitokoto}</li>
                </ul>
        </InfoWindow>   
         }
        
          </GoogleMap>
        
      : <Spinner />
      }

  </>    
  )
}


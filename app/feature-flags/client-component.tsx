'use client'

import { Text } from "@chakra-ui/react";
import { useEffect, useState } from 'react';

type FeatureFlagClientProps = {
  initialValue: boolean;
}

export function FeatureFlagClient({ initialValue }: FeatureFlagClientProps) {
  const [featureEnabled, setFeatureEnabled] = useState(initialValue);
  const backgroundColor = featureEnabled ? "bg-purple-200" : "bg-green-200";

  useEffect(() => {
    // Actualizamos el estado inicial con el valor del servidor
    setFeatureEnabled(initialValue);
    
    // Aquí podrías implementar el SDK de cliente de LaunchDarkly para recibir
    // actualizaciones en tiempo real. Por ahora, usamos el valor del servidor
    // como punto de partida.
    
    // Ejemplo de cómo podría ser con el SDK de cliente (esto requeriría instalar
    // e inicializar el SDK del cliente de LaunchDarkly correctamente):
    /*
    import * as LDClient from 'launchdarkly-js-client-sdk';
    
    const client = LDClient.initialize(
      'CLIENT_SIDE_ID',
      { kind: 'user', key: 'feature-flags' }
    );
    
    client.on('ready', () => {
      // Obtener el valor actual
      const currentValue = client.variation('sample-feature', false);
      setFeatureEnabled(currentValue);
      
      // Escuchar cambios
      client.on('change:sample-feature', (newValue) => {
        setFeatureEnabled(newValue);
      });
    });
    
    return () => {
      // Limpiar el cliente al desmontar
      client.close();
    };
    */
  }, [initialValue]);

  return (
    <div
      className={`mt-10 max-w-xl mx-auto rounded ${backgroundColor} p-6 min-h-56 flex items-center justify-center`}
    >
      <Text fontSize="lg">
        Mi nueva funcionalidad:{" "}
        <span className="font-semibold">
          {featureEnabled ? "Activada" : "Desactivada"}
        </span>
      </Text>
    </div>
  );
}

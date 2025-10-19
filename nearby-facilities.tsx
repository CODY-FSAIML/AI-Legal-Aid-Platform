"use client"

import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Phone, Clock, AlertCircle, MapPinOff } from "lucide-react"
import type { Facility } from "@/hooks/use-location"

interface NearbyFacilitiesProps {
  facilities: Facility[]
  loading: boolean
  error: string | null
  permissionDenied: boolean
  onRequestLocation: () => void
  facilityType: string
}

export default function NearbyFacilities({
  facilities,
  loading,
  error,
  permissionDenied,
  onRequestLocation,
  facilityType,
}: NearbyFacilitiesProps) {
  const { t } = useLanguage()

  if (loading) {
    return (
      <Card className="p-6 space-y-4 border-2 border-primary bg-blue-50">
        <h3 className="text-2xl font-semibold text-primary">📍 {t("location.nearby")}</h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-pulse text-lg text-muted-foreground">{t("location.loading")}</div>
        </div>
      </Card>
    )
  }

  if (error && !permissionDenied) {
    return (
      <Card className="p-6 space-y-4 bg-red-50 border-red-200">
        <div className="flex gap-3">
          <AlertCircle size={24} className="text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-red-900">{t("location.error")}</h3>
            <p className="text-base text-red-800 mt-2">{error}</p>
          </div>
        </div>
      </Card>
    )
  }

  if (permissionDenied) {
    return (
      <Card className="p-6 space-y-4 bg-yellow-50 border-yellow-200 border-2">
        <div className="space-y-4">
          <div className="flex gap-3">
            <MapPinOff size={24} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900">📍 {t("location.permission_denied")}</h3>
              <p className="text-base text-yellow-800 mt-2">{t("location.enable_location")}</p>
            </div>
          </div>
          <Button
            onClick={onRequestLocation}
            className="w-full h-12 text-lg font-semibold bg-yellow-600 hover:bg-yellow-700 text-white"
            aria-label="Enable location access"
          >
            {t("location.enable")}
          </Button>
          <div className="p-4 bg-white rounded-lg border border-yellow-200">
            <p className="text-base font-semibold text-yellow-900 mb-3">{t("location.fallback_title")}</p>
            <ul className="space-y-2 text-base text-yellow-800">
              <li>• {t("location.fallback_1")}</li>
              <li>• {t("location.fallback_2")}</li>
              <li>• {t("location.fallback_3")}</li>
            </ul>
          </div>
        </div>
      </Card>
    )
  }

  if (facilities.length === 0) {
    return (
      <Card className="p-6 space-y-4 border-2 border-primary bg-blue-50">
        <h3 className="text-2xl font-semibold text-primary">📍 {t("location.nearby")}</h3>
        <p className="text-lg text-muted-foreground">{t("location.no_facilities")}</p>
      </Card>
    )
  }

  return (
    <Card className="p-6 space-y-4 border-2 border-primary bg-blue-50">
      <h3 className="text-2xl font-semibold text-primary">📍 {t("location.nearby")}</h3>
      <div className="space-y-4">
        {facilities.map((facility, idx) => (
          <div key={idx} className="p-4 border-2 border-primary rounded-lg hover:bg-white transition-colors bg-white">
            <div className="flex justify-between items-start gap-4 mb-3">
              <div>
                <h4 className="text-xl font-semibold text-foreground">{facility.name}</h4>
                <div className="flex items-center gap-2 mt-2 text-base text-muted-foreground font-semibold">
                  <MapPin size={18} />
                  <span>{facility.distance.toFixed(1)} km away</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-base">
              <div className="flex gap-3">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground font-semibold">{facility.address}</span>
              </div>

              {facility.phone && (
                <div className="flex gap-3">
                  <Phone size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <a href={`tel:${facility.phone}`} className="text-primary hover:underline font-semibold text-lg">
                    {facility.phone}
                  </a>
                </div>
              )}

              {facility.hours && (
                <div className="flex gap-3">
                  <Clock size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-semibold">{facility.hours}</span>
                </div>
              )}
            </div>

            <Button
              onClick={() => {
                const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(facility.address)}`
                window.open(mapsUrl, "_blank")
              }}
              className="w-full mt-4 h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
              aria-label={`Get directions to ${facility.name}`}
            >
              📍 {t("location.directions")}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}

"use client"

import { useState, useCallback } from "react"

export interface Location {
  latitude: number
  longitude: number
}

export interface Facility {
  name: string
  type: "hospital" | "clinic" | "police" | "legal_aid" | "court"
  address: string
  distance: number
  phone?: string
  hours?: string
}

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [permissionDenied, setPermissionDenied] = useState(false)

  const requestLocation = useCallback(() => {
    setLoading(true)
    setError(null)
    setPermissionDenied(false)

    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setLoading(false)
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setPermissionDenied(true)
          setError("Location permission denied. Please enable location access to find nearby facilities.")
        } else {
          setError("Unable to get your location. Please try again.")
        }
        setLoading(false)
      },
    )
  }, [])

  // Mock nearby facilities data - in production, this would call a real API
  const getNearbyFacilities = useCallback(
    (type: Facility["type"]): Facility[] => {
      if (!location) return []

      const mockFacilities: Record<Facility["type"], Facility[]> = {
        hospital: [
          {
            name: "City General Hospital",
            type: "hospital",
            address: "123 Main Street, City Center",
            distance: 0.8,
            phone: "1234567890",
            hours: "24/7",
          },
          {
            name: "Medical Care Hospital",
            type: "hospital",
            address: "456 Oak Avenue, Downtown",
            distance: 1.2,
            phone: "0987654321",
            hours: "24/7",
          },
          {
            name: "Emergency Medical Center",
            type: "hospital",
            address: "789 Pine Road, North District",
            distance: 1.5,
            phone: "5555555555",
            hours: "24/7",
          },
        ],
        clinic: [
          {
            name: "Health Plus Clinic",
            type: "clinic",
            address: "321 Elm Street, Market Area",
            distance: 0.5,
            phone: "1111111111",
            hours: "9 AM - 6 PM",
          },
          {
            name: "Community Health Center",
            type: "clinic",
            address: "654 Maple Drive, Residential Area",
            distance: 0.9,
            phone: "2222222222",
            hours: "8 AM - 8 PM",
          },
          {
            name: "Primary Care Clinic",
            type: "clinic",
            address: "987 Cedar Lane, Shopping District",
            distance: 1.1,
            phone: "3333333333",
            hours: "9 AM - 5 PM",
          },
        ],
        police: [
          {
            name: "City Police Station",
            type: "police",
            address: "111 Government Road, Administrative Zone",
            distance: 1.3,
            phone: "100",
            hours: "24/7",
          },
          {
            name: "District Police Headquarters",
            type: "police",
            address: "222 Law Street, Civic Center",
            distance: 2.0,
            phone: "100",
            hours: "24/7",
          },
          {
            name: "Community Police Outpost",
            type: "police",
            address: "333 Safety Avenue, Local Area",
            distance: 0.7,
            phone: "100",
            hours: "24/7",
          },
        ],
        legal_aid: [
          {
            name: "District Legal Aid Center",
            type: "legal_aid",
            address: "444 Justice Street, Court Complex",
            distance: 1.8,
            phone: "1800-11-4000",
            hours: "10 AM - 5 PM",
          },
          {
            name: "Community Legal Services",
            type: "legal_aid",
            address: "555 Rights Road, Social Welfare Building",
            distance: 1.2,
            phone: "1800-11-4000",
            hours: "9 AM - 6 PM",
          },
          {
            name: "Free Legal Clinic",
            type: "legal_aid",
            address: "666 Help Lane, NGO Complex",
            distance: 0.9,
            phone: "1800-11-4000",
            hours: "10 AM - 4 PM",
          },
        ],
        court: [
          {
            name: "District Court",
            type: "court",
            address: "777 Court Street, Judicial Complex",
            distance: 2.2,
            phone: "9876543210",
            hours: "10 AM - 5 PM",
          },
          {
            name: "Consumer Court",
            type: "court",
            address: "888 Consumer Avenue, Commercial Zone",
            distance: 1.9,
            phone: "9876543211",
            hours: "10 AM - 5 PM",
          },
          {
            name: "Family Court",
            type: "court",
            address: "999 Family Street, Civic Center",
            distance: 2.1,
            phone: "9876543212",
            hours: "10 AM - 5 PM",
          },
        ],
      }

      return mockFacilities[type] || []
    },
    [location],
  )

  return {
    location,
    loading,
    error,
    permissionDenied,
    requestLocation,
    getNearbyFacilities,
  }
}

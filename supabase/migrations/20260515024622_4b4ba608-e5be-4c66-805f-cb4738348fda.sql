
-- Fix function search_path
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Restrict has_role from being called directly via PostgREST API
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;

-- Add length checks to public-insert tables (anti-DoS / spam)
ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_messages_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  ADD CONSTRAINT contact_messages_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT contact_messages_phone_len CHECK (phone IS NULL OR char_length(phone) <= 32),
  ADD CONSTRAINT contact_messages_message_len CHECK (char_length(message) BETWEEN 1 AND 2000);

ALTER TABLE public.orders
  ADD CONSTRAINT orders_name_len CHECK (char_length(customer_name) BETWEEN 1 AND 120),
  ADD CONSTRAINT orders_phone_len CHECK (char_length(customer_phone) BETWEEN 5 AND 32),
  ADD CONSTRAINT orders_address_len CHECK (customer_address IS NULL OR char_length(customer_address) <= 500),
  ADD CONSTRAINT orders_notes_len CHECK (notes IS NULL OR char_length(notes) <= 2000),
  ADD CONSTRAINT orders_total_range CHECK (total >= 0 AND total <= 1000000),
  ADD CONSTRAINT orders_items_size CHECK (jsonb_array_length(items) BETWEEN 1 AND 100);
